import {
	SpecialStatus,
	TaggedImage,
	Xyz,
} from "farmbot";

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
				"x": 150+20,
				"y": 100+20,
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
			"attachment_url": "https://i.imgur.com/jgZMupJ.jpeg",
			"meta": {
				"x": 950+20,
				"y": 900+20,
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
				"x": 150+20,
				"y": 900+20,
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
				"x": 550+20,
				"y": 100+20,
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
				"x": 150+20,
				"y": 500+20,
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
				"x": 550+20,
				"y": 900+20,
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
				"x": 950+20,
				"y": 100+20,
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
				"x": 950+20,
				"y": 500+20,
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
			"attachment_url": "https://i.imgur.com/K3ye6hH.jpeg",
			"meta": {
				"x": 550+20,
				"y": 500+20,
				"z": 164
			}
		},
		"uuid": "Image.6.4"
	},
];

export const flipperImages: TaggedImage[] = demoImages;