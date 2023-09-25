import {
	SpecialStatus,
	TaggedImage,
	TaggedWebcamFeed,
	Xyz,
} from "farmbot";
import cloneDeep from 'lodash/cloneDeep';

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

export const demoImages: TaggedImage[] = [
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
			"id": 2,
			"device_id": 8,
			"attachment_processed_at": "2017-06-02T14:16:45.899Z",
			"updated_at": "2017-06-02T14:16:45.903Z",
			"created_at": "2017-06-02T14:14:22.747Z",
			"attachment_url": "https://i.imgur.com/EVo6XOU.jpeg",
			"meta": {
				"x": 200,
				"y": 600,
				"z": 164
			}
		},
		"uuid": "Image.8.4"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 3,
			"device_id": 8,
			"attachment_processed_at": "2017-06-01T14:16:34.839Z",
			"updated_at": "2017-06-01T14:16:34.984Z",
			"created_at": "2017-06-01T14:14:22.726Z",
			"attachment_url": "https://i.imgur.com/WsqcMr3.jpeg",
			"meta": {
				"x": 200,
				"y": 1000,
				"z": 53
			}
		},
		"uuid": "Image.7.5"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 4,
			"device_id": 8,
			"attachment_processed_at": "2017-05-28T14:16:55.709Z",
			"updated_at": "2017-05-28T14:16:55.715Z",
			"created_at": "2017-05-28T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/EudVDLU.jpeg",
			"meta": {
				"x": 600,
				"y": 200,
				"z": 164
			}
		},
		"uuid": "Image.6.9"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 5,
			"device_id": 8,
			"attachment_processed_at": "2017-05-27T14:16:55.709Z",
			"updated_at": "2017-05-27T14:16:55.715Z",
			"created_at": "2017-05-27T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/Xou4Ubz.jpeg",
			"meta": {
				"x": 600,
				"y": 600,
				"z": 164
			}
		},
		"uuid": "Image.6.8"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 6,
			"device_id": 8,
			"attachment_processed_at": "2017-05-26T14:16:55.709Z",
			"updated_at": "2017-05-26T14:16:55.715Z",
			"created_at": "2017-05-26T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/kAmrAZy.jpeg",
			"meta": {
				"x": 600,
				"y": 1000,
				"z": 164
			}
		},
		"uuid": "Image.6.7"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 7,
			"device_id": 8,
			"attachment_processed_at": "2017-05-25T14:16:55.709Z",
			"updated_at": "2017-05-25T14:16:55.715Z",
			"created_at": "2017-05-25T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/emxArQX.jpeg",
			"meta": {
				"x": 1000,
				"y": 200,
				"z": 164
			}
		},
		"uuid": "Image.6.6"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 8,
			"device_id": 8,
			"attachment_processed_at": "2017-05-21T14:16:55.709Z",
			"updated_at": "2017-05-21T14:16:55.715Z",
			"created_at": "2017-05-21T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/U3mBYpG.jpeg",
			"meta": {
				"x": 1000,
				"y": 600,
				"z": 164
			}
		},
		"uuid": "Image.6.5"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 9,
			"device_id": 8,
			"attachment_processed_at": "2017-05-20T14:16:55.709Z",
			"updated_at": "2017-05-20T14:16:55.715Z",
			"created_at": "2017-05-20T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/jgZMupJ.jpeg",
			"meta": {
				"x": 1000,
				"y": 1000,
				"z": 164
			}
		},
		"uuid": "Image.6.4"
	},
];

export var demoCurrentImage: TaggedImage = demoImages[0];
export function setCurrentImage(image: TaggedImage) {
	demoCurrentImage = image;
}

// get the image of current position. 
export function getImage(): TaggedImage {
	const id: number = Math.floor(((demoPos.x || 0) + 150) / 400) * 3 + Math.floor(((demoPos.y || 0) + 100) / 400) + 1;
	return demoImages[demoImages.indexOf(demoImages.filter(i => i.body.id === id)[0])]
}

export var prevImages = cloneDeep(demoImages);

export function checkUpdate() {
	if (prevImages.length != demoImages.length) {
		prevImages = cloneDeep(demoImages);
		return true;
	} else {
		return false;
	}
}

