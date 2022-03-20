package main

import "fmt"

type fifo struct {
}

func (l *fifo) evicdt(c *cache) {
	fmt.Println("Evicting w fifo")
}
