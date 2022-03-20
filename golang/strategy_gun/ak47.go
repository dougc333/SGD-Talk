package main

type ak47 struct {
	gun
}

func newAK47() iGun {
	return &ak47{
		gun: gun{
			name:  "AK47 gun",
			power: 5,
		},
	}
}
