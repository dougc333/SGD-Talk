from dataclasses import dataclass
from decimal import Decimal
from stripe_service import StripePaymentService


@dataclass
class SavingsAccount:
    account_number: str
    balance: Decimal


@dataclass
class CheckingAccount:
    account_number: str
    balance: Decimal


class BankService:
    payment_service: StripePaymentService
    checking_account: CheckingAccount
    savings_account: SavingsAccount

    def __init__(self, s: StripePaymentService, checking_account: CheckingAccount, savings_account: SavingsAccount):
        self.payment_service = s
        self.checking_account = checking_account
        self.savings_account = savings_account

    def deposit(
        self, amount: Decimal, account: SavingsAccount | CheckingAccount
    ) -> None:
        if isinstance(account, SavingsAccount):
            print(
                f"Depositing {amount} into Savings Account {account.account_number}.")

        else:
            print(
                f"Depositing {amount} into Checking Account {account.account_number}."
            )

        self.payment_service.set_api_key("sk_test_1234567890")
        self.payment_service.process_payment(amount)
        # this isnt part of the interface. Balance is part of checking accuont and saavings account
        # self.account.balance += amount

    def withdraw(
        self, amount: Decimal, account: SavingsAccount | CheckingAccount
    ) -> None:
        if isinstance(account, SavingsAccount):
            print(
                f"Withdrawing {amount} from Savings Account {account.account_number}."
            )
        else:
            print(
                f"Withdrawing {amount} from Checking Account {account.account_number}."
            )
        payment_service = StripePaymentService()
        payment_service.set_api_key("sk_test_1234567890")
        payment_service.process_payout(amount)
        account.balance -= amount
