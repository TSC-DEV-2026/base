from sqlalchemy import BigInteger, Column, String

from app.db.base import Base


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    document = Column(String(14), unique=True, nullable=True)
