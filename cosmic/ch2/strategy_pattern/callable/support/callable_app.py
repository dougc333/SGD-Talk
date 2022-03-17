import random
from typing import Callable

from support.callable_ticket import SupportTicket

TicketOrderingStrategy = Callable[[list[SupportTicket]], list[SupportTicket]]


class FIFOProcessing:
    def __call__(self, tickets: list[SupportTicket]) -> list[SupportTicket]:
        print("PT FIFO")
        return tickets.copy()


class FILOProcessing:
    def __call__(self, tickets: list[SupportTicket]) -> list[SupportTicket]:
        return list(reversed(tickets))


class RandomProcessing:
    def __call__(self, tickets: list[SupportTicket]) -> list[SupportTicket]:
        return random.sample(tickets, len(tickets))


class CustomerSupport:
    def __init__(self):
        self.tickets: list[SupportTicket] = []

    def add_ticket(self, ticket: SupportTicket):
        self.tickets.append(ticket)

    def process_tickets(self, processing_strategy: TicketProcessing):

        ticket_ordering_list = processing_strategy(self.tickets)

        for ticket in ticket_ordering_list:
            ticket.process()
