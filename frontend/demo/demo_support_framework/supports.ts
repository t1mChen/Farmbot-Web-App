import { success, info } from "../../toast/toast";
import { t } from "../../i18next_wrapper";

import {
	SpecialStatus,
	TaggedImage,
	TaggedWebcamFeed,
	Xyz,
} from "farmbot";
import cloneDeep from 'lodash/cloneDeep';
import { demoPhotos } from "./demo_photos";
import { createAdOnce } from "../../toast/toast_internal_support";
import { CreateToastOnceProps } from "../../toast/interfaces";

// a sample webcam feed for demo
export const demoWebcamFeed: TaggedWebcamFeed = {
	kind: "WebcamFeed",
	specialStatus: SpecialStatus.SAVED,
	body: {
		url: "http://89.26.84.194:5661/mjpg/video.mjpg",
		name: "demoWebcamFeed",
	},
	uuid: "demoWebcamFeed"
}

// a local representation of the current status of position
export const demoPos: Record<Xyz, number | undefined> = {
	x: 0,
	y: 0,
	z: 0,
};

// limitation of the sample farmbot map
export const map_limit = {
	x: 2900,
	y: 1400,
	z: 400,
};

// a sample of images for demo
export var demoImages: TaggedImage[] = demoPhotos;

export var demoCurrentImage: TaggedImage | undefined = demoImages[0];
export function setCurrentImage(image: TaggedImage) {
	demoCurrentImage = image;
}

// take photo of current position of FarmBot. 
export function demoTakePhoto(): void {
	maybePopupAd();
	// get image of current position
	const id: number = Math.floor(((demoPos.x || 0) + 150) / 400) * 3 + Math.floor(((demoPos.y || 0) + 100) / 400) + 1;
	const image = demoImages[demoImages.indexOf(demoImages.filter(i => i.body.id === id)[0])]
	// push the image to the head of demoImages. 
	demoImages.unshift(cloneDeep(image));
	// set image as current image. 
	demoCurrentImage = demoImages[0];
	success(t("Photo Taken"));
}

// delete current photo in flipper
export function demoDeletePhoto(): void {
	maybePopupAd();
	if (demoCurrentImage) {
		// get the index of current image. 
		const i: number = demoImages.indexOf(demoCurrentImage);
		// remove current image. 
		demoImages.splice(i, 1);
		// set next current image. 
		if (demoImages.length > 0) {
			demoCurrentImage = i < demoImages.length ? demoImages[i] : demoImages[i - 1];
		} else {
			demoCurrentImage = undefined;
		}
		success(t("Image Deleted."));
	}
}

// rotate current photo in flipper
export var currentRotation: number = 0;
export function demoToggleRotation(): void { currentRotation = (currentRotation + 90) % 360 }

// placeholder for crop current photo
export function demoToggleCrop(): void { info(t("Sorry, demo account does not support crop photos")) }

export const demoRenderLabel = (value: number) => {
	if (value == demoImages.length - 1) { return t("newest"); }
	if (value == 0) { return t("oldest"); }
	return "";
}
export const demoGetImageIndex = (image: TaggedImage | undefined): number => {
	if (image) { return demoImages.length - 1 - demoImages.indexOf(image) }
	else { return 0 }
}

/** Compare Logic */
// flag to check if comparing photos
export var isComparing: boolean = false
export var compareList: TaggedImage[] = [];
function getCompareList(): TaggedImage[] {
	const currentX: number = demoCurrentImage?.body.meta.x || -1;
	const currentY: number = demoCurrentImage?.body.meta.y || -1;
	return demoImages.filter((image) =>
		(image.body.meta.x == currentX) && (image.body.meta.y == currentY))
}
// Function to swith between normal mode and comparing mode. 
export function demoCompare() {
	maybePopupAd();
	if (isComparing) {
		info(t("Comparing mode exited"));
		isComparing = false;
	} else {
		compareList = getCompareList();
		if (compareList.length > 1) {
			isComparing = true;
			info(t("Comparing photos, click again to exit comparing mode"));
		} else {
			info(t("No photo to compare for current image"));
		}
	}
}

// check if the state is updated. 
export var prevImages = cloneDeep(demoImages);
var prevMode = isComparing;
export function checkUpdate() {
	if (prevMode != isComparing) {
		prevMode = isComparing;
		return true;
	}
	if (prevImages.length != demoImages.length) {
		prevImages = cloneDeep(demoImages);
		return true;
	} else {
		return false;
	}
}

export const ad_counter = {
	count: 1,
	POPUP: 15,
	adCount: 1,
};

const adMessageOne = (): CreateToastOnceProps => ({
    message: "Purchase your FarmBot today",
    title: "Like it? Own a FarmBot right now!!!",
    color: "purple",
    idPrefix: "id-prefix",
    noTimer: false,
    noDismiss: false,
	isAd: true,
	url: "https://cdn.shopify.com/s/files/1/2040/0289/files/Lights_533748a7-5c48-4d01-97f2-2ceb12975f69_608x352.jpg?v=1527410843",
});

const adMessageTwo = (): CreateToastOnceProps => ({
    message: "Why not own a FarmBot today?",
    title: "Enjoy the experience?",
    color: "dark-orange",
    idPrefix: "id-prefix",
    noTimer: false,
    noDismiss: false,
	isAd: true,
	url: "https://cdn.shopify.com/s/files/1/2040/0289/files/Motors_600x.JPG?6857",
});

const adMessageThree = (): CreateToastOnceProps => ({
    message: "Check out the latest models",
    title: "FarmBot is available!!!",
    color: "dark-blue",
    idPrefix: "id-prefix",
    noTimer: false,
    noDismiss: false,
	isAd: true,
	url: "https://cdn.shopify.com/s/files/1/2040/0289/files/Motors_600x.JPG?6857",
});
// pop up ad function
// when some components are accessed for a certain times
// display ad
export function maybePopupAd(){
	if(ad_counter.count!=null&&ad_counter.POPUP!=null&&ad_counter.adCount!=null){
		if(ad_counter.count>=ad_counter.POPUP){
			// rotate through different ads 
			if(ad_counter.adCount==1){
				createAdOnce(adMessageOne());
			}else if(ad_counter.adCount==2){
				createAdOnce(adMessageTwo());
			}else{
				createAdOnce(adMessageThree());
				ad_counter.adCount = 1;
			}			
			ad_counter.count = 0;
			ad_counter.adCount += 1;
		}
		ad_counter.count+=1;
	}
}
