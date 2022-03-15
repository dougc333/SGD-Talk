from dataclasses import dataclass
from lib2to3.pgen2.token import ISNONTERMINAL, PERCENTEQUAL

@dataclass 
class HourlyEmployee:
    name:str
    id:int
    commission:float = 100.
    contracts_lanced:float = 0.
    pay_rate:float = 0.
    hours_worked:int = 0
    employer_cost:float = 0.
    
    def compute_pay(self) -> float:
        return self.hours_worked * self.pay_rate + self.employer_cost + self.commission*self.contracts_lanced

@dataclass
class SalariedEmployee:
    name:str
    id:int
    commission:float = 100.
    contracts_lanced:float = 0.
    monthly_salary:float = 0.
    percentage:float = 1.
    
    def compute_pay(self) -> float:
        return self.monthly_salary * self.percentage + self.commission * self.contracts_lanced
    
@dataclass
class FreeLancer:
    name:str
    id:int
    commission:float = 100.
    contracts_lanced:float = 0.
    pay_rate:float = 0.
    hours_worked:int = 0
    vat_number:str = ""
    
    def compute_pay(self) -> float:
        return (self.pay_rate * self.hours_worked + self.commission * self.contracts_lanced)
    
    
    def main() -> None:
        henry = HourlyEmployee(name="Henry", id=12, pay_rate=40, hours_worked=100)
        print(
            f"HourlyEmployee {henry.name} worked for {henry.hours_worked} and earned {henry.compute_pay()}"
        )
        sarah=SalariedEmployee(name="Sarah", id=1, monthly_salary=10000, contracts_lanced=10)
        print(
            f"SalariedEmployee {sarah.name} landed {sarah.contracts_lanced} and earned {sarah.compute_pay()}"
        )
        
        bill = FreeLancer(name="bill", commission=10, pay_rate=100.0, hours_worked=100,contracts_lanced=100)
        print(
            f"Freelance {bill.name} worked for {bill.hours_worked} landed {bill.contracts_lanced} and earned {bill.compute_pay()}"
        )
    
    if __name__ == '__main__':
        main()