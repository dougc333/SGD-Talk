

from typing import Sized, Iterable, Iterator

class Bucket(Sized, Iterable[int]):
    def __init__(self):
        pass
    def __len__(self) -> int:
        return 0
    def __iter__(self) -> Iterator[int]:
        return Iterator[int]
b=Bucket()
print(b.__len__())


from typing import Iterator, Iterable

class Bucket:
    def __init(self):
        self.impl=[]
    def __len__(self) -> int:
        return len(self.impl)
    def __iter__(self) -> Iterator[int]:
        return Iterator[int]

def collect(items: Iterable[int]) -> int:
    pass
result: int = collect(Bucket()) 