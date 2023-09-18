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
			"id": 9,
			"device_id": 8,
			"attachment_processed_at": "2017-06-01T14:16:55.709Z",
			"updated_at": "2017-06-01T14:16:55.715Z",
			"created_at": "2017-06-01T14:15:50.666Z",
			"attachment_url": "https://i.imgur.com/dKAkCRk.jpeg",
			"meta": {
				"x": 1400,
				"y": 400,
				"z": 164
			}
		},
		"uuid": "Image.9.3"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 8,
			"device_id": 8,
			"attachment_processed_at": "2017-06-01T14:16:45.899Z",
			"updated_at": "2017-06-01T14:16:45.903Z",
			"created_at": "2017-06-01T14:14:22.747Z",
			"attachment_url": "https://i.imgur.com/ULF0L6S.jpeg",
			"meta": {
				"x": 700,
				"y": 400,
				"z": 164
			}
		},
		"uuid": "Image.8.4"
	},
	{
		"kind": "Image",
		"specialStatus": SpecialStatus.SAVED,
		"body": {
			"id": 7,
			"device_id": 8,
			"attachment_processed_at": "2017-06-01T14:16:34.839Z",
			"updated_at": "2017-06-01T14:16:34.984Z",
			"created_at": "2017-06-01T14:14:22.726Z",
			"attachment_url": "https://i.imgur.com/iKloMdS.jpeg",
			"meta": {
				"x": 2100,
				"y": 800,
				"z": 53
			}
		},
		"uuid": "Image.7.5"
	},
];
