package main

type SupportTicket struct{
	customer string
	issue string
	id 	int
}


type TicketOrderingStrategy interface{
	func create_ordering(tickets:list[SupportTicket]) list[SupportTicket]:

}
