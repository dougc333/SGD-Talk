from abc import ABC, abstractmethod
from typing import Any

import model


class AbstractRepository(ABC):
    @abstractmethod  # (1)
    def add(self, batch: model.Batch) -> None:
        raise NotImplementedError  # (2)

    @abstractmethod
    def get(self, reference: Any) -> model.Batch:
        raise NotImplementedError


class SqlAlchemyRepository(AbstractRepository):
    def __init__(self, session: Any):
        self.session = session

    def add(self, batch: model.Batch) -> None:
        self.session.add(batch)
        return None

    def get(self, reference: Any) -> model.Batch:
        return self.session.query(model.Batch).filter_by(reference=reference).one()
