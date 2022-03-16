
from support.strategy_app import FILOOrderingStrategy
from support.strategy_app import CustomerSupport
from support.strategy_ticket import SupportTicket

def main():
    app = CustomerSupport()
    app.add_ticket(SupportTicket("John Smith", "My computer makes strange sounds"))
    app.add_ticket(SupportTicket("Linus Sebastian", "I cant upload videos please help"))
    app.add_ticket(SupportTicket("Arjan Codes", "VSCOde broken"))
    
    app.process_tickets(FILOOrderingStrategy())

if __name__=='__main__':
    main()

