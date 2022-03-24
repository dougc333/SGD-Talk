
from hashlib import blake2b
from dataclasses import dataclass
from re import U

users = []

class User:
    name:str
    password:str=blake2b(password.encode('UTF-8')).hexdigest()
    email:str
    plan:str = "basic"
    reset_code:str = ""

    def __repr__(self)-> str:
        return f"Name:{self.name}, EMAIL:{self.email}, PASSWORD:{self.password}"
    
    def reset_password(self, code:str, new_password:str)-> None:
        if code != self.reset_code:
            raise Exception('invalid ')
        self.password = blake2b(new_password.encode('UTF-8')).hexdigest()
    
def create_user(name:str, password:str, email:str)-> User:
    print(f"DB:creating user database entry for {name} and email:{email}")
    new_user = User(name,email)
    users.append(new_user)
    return new_user

def find_user(email:str)-> User:
    for u in users:
        if users.email == email:
            return u
    raise Exception("user not found")