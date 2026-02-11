# Properties App - Real Estate Backend

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/ladhani_estates
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Run Server
```bash
python manage.py runserver
```

## API Endpoints

### Amenities
- `GET /api/amenities/` - List all amenities
- `POST /api/amenities/` - Create amenity
- `GET /api/amenities/{id}/` - Get amenity details
- `PUT /api/amenities/{id}/` - Update amenity
- `DELETE /api/amenities/{id}/` - Delete amenity

### Properties
- `GET /api/properties/` - List all properties
- `POST /api/properties/` - Create property
- `GET /api/properties/{id}/` - Get property details
- `PUT /api/properties/{id}/` - Update property
- `DELETE /api/properties/{id}/` - Delete property

#### Filtering & Search
- Filter by city: `/api/properties/?city=Mumbai`
- Filter by property type: `/api/properties/?property_type=Apartment`
- Filter by listing type: `/api/properties/?listing_type=Sale`
- Search: `/api/properties/?search=luxury`
- Order by price: `/api/properties/?ordering=price` (or `-price` for descending)
- Order by date: `/api/properties/?ordering=-created_at`

### Property Images
- `GET /api/property-images/` - List all images
- `POST /api/property-images/` - Upload image
- `GET /api/property-images/{id}/` - Get image details
- `DELETE /api/property-images/{id}/` - Delete image
- Filter by property: `/api/property-images/?property={property_id}`

## Models

### Amenity
- name (unique)
- created_at

### Property
- title, slug, description
- property_type (Apartment, Villa, Plot, Commercial)
- listing_type (Sale, Rent)
- price
- city, area, address
- bedrooms, bathrooms, built_up_area
- main_image (Cloudinary)
- amenities (ManyToMany)
- is_featured, is_active
- created_by (User)
- created_at

### PropertyImage
- property (ForeignKey)
- image (Cloudinary)
- uploaded_at

## Admin Panel
Access at: `http://localhost:8000/admin/`

You can manage:
- Amenities
- Properties (with inline image upload)
- Property Images
