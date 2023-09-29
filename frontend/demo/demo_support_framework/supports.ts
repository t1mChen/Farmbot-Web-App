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

// place holder for compare Images
export var compareImages: TaggedImage[] = [
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 1,
			"device_id": 8,
			"attachment_processed_at": "2017-06-03T14:16:55.709Z",
			"updated_at": "2017-06-03T14:16:55.715Z",
			"created_at": "2017-06-03T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/LLajqT3.jpeg",
			"meta": {
				"x": 200,
				"y": 200,
				"z": 164
			}
		},
		"uuid": "Image.9.3"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 10,
			"device_id": 8,
			"attachment_processed_at": "2017-06-03T14:16:54.709Z",
			"updated_at": "2017-06-03T14:16:54.715Z",
			"created_at": "2017-06-03T14:15:49.666Z",
			"attachment_url": "https://i.imgur.com/jgZMupJ.jpeg",
			"meta": {
				"x": 200,
				"y": 200,
				"z": 164
			}
		},
		"uuid": "Image.9.2"
	},
]

export var demoCurrentImage: TaggedImage | undefined = demoImages[0];
export function setCurrentImage(image: TaggedImage) {
	demoCurrentImage = image;
}

// take photo of current position of FarmBot. 
export function demoTakePhoto(): void {
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

// check if the `demoImages` is updated. 
export var prevImages = cloneDeep(demoImages);
export function checkUpdate() {
	if (prevImages.length != demoImages.length) {
		prevImages = cloneDeep(demoImages);
		return true;
	} else {
		return false;
	}
}

export const demoRenderLabel = (value: number) => {
	if (value == demoImages.length - 1) { return t("newest"); }
	if (value == 0) { return t("oldest"); }
	return "";
}
export const demoGetImageIndex = (image: TaggedImage | undefined): number => {
	if (image) { return demoImages.length - 1 - demoImages.indexOf(image) }
	else { return 0 }
}

// flag to check if comparing photos
export var isComparing: boolean = false
export function demoCompare() {
	if (isComparing) {
		info(t("Comparing mode exited"));
	} else {
		info(t("Comparing photos, click again to exit comparing mode"));
	}
	isComparing = !isComparing;
}