from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import os

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./contacts.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    avatar = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models
class ContactBase(BaseModel):
    name: str
    email: str
    phone: str
    avatar: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None

class ContactResponse(ContactBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# FastAPI app
app = FastAPI(
    title="Contact List API",
    description="A modern contact management API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Routes
@app.get("/")
async def root():
    return {"message": "Contact List API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.get("/contacts", response_model=List[ContactResponse])
async def get_contacts(skip: int = 0, limit: int = 100, search: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all contacts with optional search and pagination"""
    query = db.query(Contact)
    
    if search:
        query = query.filter(
            Contact.name.contains(search) |
            Contact.email.contains(search) |
            Contact.phone.contains(search)
        )
    
    contacts = query.offset(skip).limit(limit).all()
    return contacts

@app.get("/contacts/{contact_id}", response_model=ContactResponse)
async def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """Get a specific contact by ID"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@app.post("/contacts", response_model=ContactResponse)
async def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    """Create a new contact"""
    # Check if email already exists
    existing_contact = db.query(Contact).filter(Contact.email == contact.email).first()
    if existing_contact:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Generate avatar URL if not provided
    if not contact.avatar:
        contact.avatar = f"https://ui-avatars.com/api/?name={contact.name.replace(' ', '+')}&background=random&color=fff&size=150"
    
    db_contact = Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.put("/contacts/{contact_id}", response_model=ContactResponse)
async def update_contact(contact_id: int, contact_update: ContactUpdate, db: Session = Depends(get_db)):
    """Update an existing contact"""
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    # Check if email already exists (if email is being updated)
    if contact_update.email and contact_update.email != db_contact.email:
        existing_contact = db.query(Contact).filter(Contact.email == contact_update.email).first()
        if existing_contact:
            raise HTTPException(status_code=400, detail="Email already exists")
    
    # Update fields
    update_data = contact_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contact, field, value)
    
    db_contact.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """Delete a contact"""
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    db.delete(db_contact)
    db.commit()
    return {"message": "Contact deleted successfully"}

@app.get("/contacts/search/{search_term}", response_model=List[ContactResponse])
async def search_contacts(search_term: str, db: Session = Depends(get_db)):
    """Search contacts by name, email, or phone"""
    contacts = db.query(Contact).filter(
        Contact.name.contains(search_term) |
        Contact.email.contains(search_term) |
        Contact.phone.contains(search_term)
    ).all()
    return contacts

# Seed some initial data
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    
    # Check if contacts already exist
    if db.query(Contact).count() == 0:
        # Create some sample contacts
        sample_contacts = [
            Contact(
                name="John Doe",
                email="john.doe@example.com",
                phone="+1 (555) 123-4567",
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            ),
            Contact(
                name="Jane Smith",
                email="jane.smith@example.com",
                phone="+1 (555) 234-5678",
                avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            ),
            Contact(
                name="Mike Johnson",
                email="mike.johnson@example.com",
                phone="+1 (555) 345-6789",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            ),
            Contact(
                name="Sarah Wilson",
                email="sarah.wilson@example.com",
                phone="+1 (555) 456-7890",
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            ),
            Contact(
                name="David Brown",
                email="david.brown@example.com",
                phone="+1 (555) 567-8901",
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
            )
        ]
        
        for contact in sample_contacts:
            db.add(contact)
        
        db.commit()
        print("Sample contacts created!")
    
    db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

