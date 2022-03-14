import model

class AbstractRepository(abc.ABC):
    @abc.abstractmethod  #(1)
    def add(self, batch: model.Batch):
        raise NotImplementedError  #(2)

    @abc.abstractmethod
    def get(self, reference) -> model.Batch:
        raise NotImplementedError
    
    
    
def test_repository_can_save_a_batch(session):
    batch = model.Batch("batch1", "RUSTY-SOAPDISH", 100, eta=None)

    repo = repository.SqlAlchemyRepository(session)
    repo.add(batch)  #(1)
    session.commit()  #(2)

    rows = session.execute(  #(3)
        'SELECT reference, sku, _purchased_quantity, eta FROM "batches"'
    )
    assert list(rows) == [("batch1", "RUSTY-SOAPDISH", 100, None)]



test_repository_can_save_a_batch()