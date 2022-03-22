from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, SmallInteger,ForeignKey

from sqlalchemy.orm import sessionmaker,relationship
from sqlalchemy.ext.declarative import declarative_base

#engine = create_engine('sqlite:///orders.db', echo = True)
#meta = MetaData()
engine = create_engine('sqlite:///books.db', echo = True)
#meta = MetaData()
Base = declarative_base()

#orders = Table(
#   'orders', meta,
#   Column('id', Integer, primary_key = True),
#)

#meta.create_all(engine)

class Book(Base):
    """
    Our Book class
    """
    __tablename__ = 'book'

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    author = Column(String(100), nullable=False)
    publisher = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)

    def __repr__(self):
        return "<Book(title='%s', author='%s', publisher='%s', year='%d')>" % (
            self.title, self.author, self.publisher, self.year)

    def __init__(self, title, author, publisher, year):
        self.title = title
        self.author = author
        self.publisher = publisher
        self.year = year

class Review(Base):
    """
    Our Review class
    """
    __tablename__ = 'review'
    id = Column(Integer, primary_key=True)
    reviewer = Column(String(100), nullable=False)
    rate = Column(SmallInteger, nullable=False)  # 1-5 stars
    review = Column(String(500), nullable=True)
    book_id = Column(Integer, ForeignKey('book.id'))
    book = relationship("Book", back_populates="reviews")

    def __repr__(self):
        return "<Review(reviewer='%s', rate='%d', review='%s', book_id='%s')>" % (
            self.reviewer, self.rate, self.review, self.book_id)

Book.reviews = relationship("Review", order_by=Review.id, back_populates="book")
Base.metadata.create_all(engine)
sess = sessionmaker(bind=engine)

