package main

import (
	"container/list"
	"fmt"
)

type SupportTicket struct {
	id    string
	issue string
}

type TicketOrderingStrategy interface {
	create_ordering()
}

func f() SupportTicket {
	s := new(SupportTicket)
	s.id = "a"
	s.issue = "in fn"
	return *s
}

func g(a SupportTicket) SupportTicket {
	fmt.Println("a fields in SupportTicket this should be pass by reference:", a)
	return a
}

func a(s []SupportTicket) []SupportTicket {
	b := new(SupportTicket)
	b.id = "b"
	b.issue = "b issue ddfdfdfd"
	fmt.Println(len(s))
	arr := make([]SupportTicket, 1)
	arr[0] = *b
	return arr
}

func b(list SupportTicket) list  SupportTicket {

}

//func (list SupportTicket) create_ordering(tickets list[SupportTicket]) {
//
//}

func main() {
	stuff := list.New()
	stuff.Init()
	var st1 = SupportTicket{
		id:    "1",
		issue: "ticket1",
	}
	var st2 = SupportTicket{
		id:    "2",
		issue: "ticket2",
	}
	var st3 = new(SupportTicket)
	st3.id = "3"
	st3.issue = "ticket3"
	stuff.PushBack(st1)
	stuff.PushBack(&st2)
	stuff.PushBack(st3)
	fmt.Println("list:", stuff)
	for e := stuff.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}
	fmt.Println("f:", f())
	fmt.Println("creating a support ticket")
	var b = new(SupportTicket)
	b.id = "b"
	b.issue = "b support ticket issue"
	fmt.Println("running g()", g(*b))
	var list list.List
	list.PushBack(st1)

}

//god damn you c programmers for desigining an API
