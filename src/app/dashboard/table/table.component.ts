import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ViewPropertyModalComponent } from '../../property/view-property-modal/view-property-modal.component';
import { EditPropertyModalComponent } from '../../property/edit-property-modal/edit-property-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../../property/add-property/add-property.component';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [FormsModule,NgFor,RouterModule,RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  filters = {
    propertyType: '',
    price: null,
    type: '',
    category: '',
    province: '',
    rooms: null,
    bathrooms: null,
    garage: null,
    size: null,
    rating: null,
    agentName: '',
    contact: '',
    status: ''
  };
  filteredData: any[] = []; // Array to store filtered data

  constructor(private dialog: MatDialog) {} 

ngOnInit() {
  this.filteredData = [...this.properties]; // Initialize with full data
}
filterTable() {
  this.filteredData = this.properties.filter(item => {
    return (
      (!this.filters.propertyType || item.property_type.toLowerCase().includes(this.filters.propertyType.toLowerCase())) &&
      (!this.filters.price || item.price <= this.filters.price) &&
      (!this.filters.type || item.type.toLowerCase().includes(this.filters.type.toLowerCase())) &&
      (!this.filters.category || item.category.toLowerCase().includes(this.filters.category.toLowerCase())) &&
      (!this.filters.province || item.province.toLowerCase().includes(this.filters.province.toLowerCase())) &&
      (!this.filters.rooms || item.rooms === this.filters.rooms) &&
      (!this.filters.bathrooms || item.bathrooms === this.filters.bathrooms) &&
      (!this.filters.garage || item.garage === this.filters.garage) &&
      (!this.filters.size || item.size === this.filters.size) &&
      (!this.filters.rating || item.rating === this.filters.rating) &&
      (!this.filters.agentName || item.agent.name.toLowerCase().includes(this.filters.agentName.toLowerCase())) &&
      (!this.filters.contact || item.agent.contact.toLowerCase().includes(this.filters.contact.toLowerCase())) &&
      (!this.filters.status || item.status.toString() === this.filters.status)
    );
  });
}
openModal(action: string, id: number) {
  const selectedItem = this.filteredData.find((item) => item.id === id);

  if (action === 'view') {
    this.dialog.open(ViewPropertyModalComponent, {
      width: '80vw',
      panelClass: 'custom-modal',
      data: selectedItem
    });
  } else if (action === 'edit') {
    this.dialog.open(EditPropertyModalComponent, {
      width: '1000px',
      data: selectedItem
    });
  }
}
AddProperty() {
    this.dialog.open(AddPropertyComponent, {
      width: '80vw',
      panelClass: 'custom-modal',
      // data: selectedItem
    });
}
slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')        // Replace spaces with dashes
    .replace(/[^\w-]+/g, ''); // Remove special characters
}

  properties = [
    {
      id: 1,
      images: [
        "https://images.prop24.com/273080775/Crop508x373",
        "https://images.prop24.com/273080776/Crop508x373"
      ],
      property_type: "rental",
      price: 6000,
      type: "House",
      category: "Residential",
      tagline: "Modern living in the heart of Pretoria!",
      province: "Pretoria Central",
      address: "15 Bopape Road",
      description: "2 bathrooms, open area, stacking doors open up to the swimming pool area, study, kitchen with granite tops, separate washing room, open plan dining room and lounge area.",
      rooms: 2,
      bathrooms: 2,
      garage: 1,
      size: 1167,
      rating: 4.3,
      status: true,
      agent: {
        id: 101,
        name: "John Smith",
        contact: "0712345678",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        socials: {
          facebook: "https://facebook.com/johnsmith",
          instagram: "https://instagram.com/johnsmith",
          linkedin: "https://linkedin.com/in/johnsmith"
        }
      }
    },
    {
      id: 2,
      images: [
        "https://assets.marketapts.com/assets/converted/262ALV/images/apartments/photos/k5jsvtcrwcmkyo6mxl4sj3ad854v5aex.jpg.800x600.jpg",
        "https://assets.marketapts.com/assets/converted/262ALV/images/apartments/photos/secondimage.jpg"
      ],
      property_type: "sale",
      price: 480000,
      type: "Apartment",
      category: "Residential",
      tagline: "Your perfect apartment awaits!",
      province: "Centurion",
      address: "026 Mandela Road",
      description: "2 bathrooms, open area, stacking doors open up to the swimming pool area, study, kitchen with granite tops, separate washing room, open plan dining room and lounge area.",
      rooms: 2,
      bathrooms: 1,
      garage: 1,
      size: 1320,
      rating: 4.5,
      status: true,
      agent: {
        id: 102,
        name: "Sarah Lee",
        contact: "0723456789",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        socials: {
          facebook: "https://facebook.com/sarahlee",
          instagram: "https://instagram.com/sarahlee",
          linkedin: "https://linkedin.com/in/sarahlee"
        }
      }
    },
    {
      id: 3,
      images: [
        "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg",
        "https://images.pexels.com/photos/276467/pexels-photo-276467.jpeg"
      ],
      property_type: "sale",
      price: 3500000,
      type: "Office",
      category: "Commercial",
      tagline: "Premium office in the heart of Sandton!",
      province: "Johannesburg",
      address: "33 Rivonia Road",
      description: "Spacious open-plan office with modern facilities and a great view of the city skyline.",
      rooms: 12,
      bathrooms: 4,
      garage: 6,
      size: 8000,
      rating: 4.7,
      status: false,
      agent: {
        id: 106,
        name: "David Wilson",
        contact: "0767890123",
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        socials: {
          facebook: "https://facebook.com/davidwilson",
          instagram: "https://instagram.com/davidwilson",
          linkedin: "https://linkedin.com/in/davidwilson"
        }
      }
    },
    {
      id: 4,
      images: [
        "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg",
        "https://cdn.houseplansservices.com/product/4eat34je4b4208ebguq0ruoekn/w800x533.jpg?v=2"
      ],
      property_type: "rental",
      price: 25000,
      type: "Penthouse",
      category: "Residential",
      tagline: "Elegant penthouse with ocean views!",
      province: "Cape Town",
      address: "12 Sea Point Blvd",
      description: "Luxury penthouse with breathtaking sea views, private rooftop, and modern amenities.",
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      size: 5000,
      rating: 4.9,
      status: true,
      agent: {
        id: 107,
        name: "Natalie Adams",
        contact: "0778901234",
        image: "https://randomuser.me/api/portraits/women/7.jpg",
        socials: {
          facebook: "https://facebook.com/natalieadams",
          instagram: "https://instagram.com/natalieadams",
          linkedin: "https://linkedin.com/in/natalieadams"
        }
      }
    },
    {
      id: 5,
      images: [
        "https://nestpropertiescostarica.com/wp-content/uploads/2022/02/greg-rivers-rChFUMwAe7E-unsplash-scaled.jpg",
        "https://images.pamgolding.co.za/content/properties/202410/2156183/h/2156183_h_21.jpg?w=600&quality=75"
      ],
      property_type: "rental",
      price: 7500,
      type: "Apartment",
      category: "Residential",
      tagline: "Urban living with style and comfort!",
      province: "Durban",
      address: "345 Ocean View Road",
      description: "Spacious apartment with 3 bedrooms, 2 bathrooms, and a balcony with city views.",
      rooms: 3,
      bathrooms: 2,
      garage: 1,
      size: 1500,
      rating: 4.2,
      status: false,
      agent: {
        id: 108,
        name: "Emma Ross",
        contact: "0785678123",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        socials: {
          facebook: "https://facebook.com/emmaross",
          instagram: "https://instagram.com/emmaross",
          linkedin: "https://linkedin.com/in/emmaross"
        }
      }
    },
    {
      id: 6,
      images: [
        "https://i2.au.reastatic.net/800x600/b170385cb200e8b5e4c9e99bce146d17814c6fd5b6e68b35333d071b4ad73ae2/image.jpg",
        "https://helium.privateproperty.co.za/live-za-images/property/1048/4/10409048/images/property-10409048-13830152_e.jpg"
      ],
      property_type: "sale",
      price: 2000000,
      type: "House",
      category: "Residential",
      tagline: "Charming house with a cozy feel!",
      province: "Pretoria East",
      address: "120 Main Street",
      description: "3 bedrooms, 2 bathrooms, open plan living, and a large garden.",
      rooms: 3,
      bathrooms: 2,
      garage: 2,
      size: 2200,
      rating: 4.4,
      status: false,
      agent: {
        id: 109,
        name: "James Carter",
        contact: "0798765432",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        socials: {
          facebook: "https://facebook.com/jamescarter",
          instagram: "https://instagram.com/jamescarter",
          linkedin: "https://linkedin.com/in/jamescarter"
        }
      }
    },
    {
      id: 7,
      images: [
        "https://i2.au.reastatic.net/800x600/cc130f644d192f3f1e65afd925315c964271816d5e5b6ff2a4610b633f0eb9b1/image.jpg",
        "https://i2.au.reastatic.net/800x600/ede44f395ecc695e61e26f2fd6149080503794e1a5bbb3250506268bfb5dc153/image.jpg"
      ],
      property_type: "sale",
      price: 950000,
      type: "Apartment",
      category: "Residential",
      tagline: "Modern apartment in the city center!",
      province: "Cape Town",
      address: "87 Long Street",
      description: "2 bedrooms, 1 bathroom, high-rise apartment with panoramic city views.",
      rooms: 2,
      bathrooms: 1,
      garage: 1,
      size: 950,
      rating: 4.6,
      status: true,
      agent: {
        id: 110,
        name: "Sophia Davis",
        contact: "0793456789",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        socials: {
          facebook: "https://facebook.com/sophiadavis",
          instagram: "https://instagram.com/sophiadavis",
          linkedin: "https://linkedin.com/in/sophiadavis"
        }
      }
    },
    {
      id: 8,
      images: [
        "https://images.pexels.com/photos/276467/pexels-photo-276467.jpeg",
        "https://images.pexels.com/photos/117234/pexels-photo-117234.jpg"
      ],
      property_type: "sale",
      price: 1200000,
      type: "House",
      category: "Residential",
      tagline: "Beautiful house with family-friendly amenities!",
      province: "Durban North",
      address: "501 Beach Road",
      description: "4 bedrooms, 3 bathrooms, a garden with a swimming pool.",
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      size: 3400,
      rating: 4.8,
      status: true,
      agent: {
        id: 111,
        name: "Michael Johnson",
        contact: "0781234567",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        socials: {
          facebook: "https://facebook.com/michaeljohnson",
          instagram: "https://instagram.com/michaeljohnson",
          linkedin: "https://linkedin.com/in/michaeljohnson"
        }
      }
    },
    {
      id: 9,
      images: [
        "https://images.pamgolding.co.za/content/properties/202405/1031432/h/1031432_h_88.jpg?w=600&quality=75",
        "https://assets.savills.com/properties/GBSSOASOA240152/SOA240152_02_l_lis.jpg"
      ],
      property_type: "sale",
      price: 500000,
      type: "Apartment",
      category: "Residential",
      tagline: "Compact, affordable, and stylish apartment!",
      province: "Pretoria West",
      address: "10 Sunnyside Avenue",
      description: "1 bedroom, 1 bathroom, ideal for a single professional or couple.",
      rooms: 1,
      bathrooms: 1,
      garage: 1,
      size: 500,
      rating: 4.1,
      status: true,
      agent: {
        id: 112,
        name: "Rachel Green",
        contact: "0763456789",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        socials: {
          facebook: "https://facebook.com/rachelgreen",
          instagram: "https://instagram.com/rachelgreen",
          linkedin: "https://linkedin.com/in/rachelgreen"
        }
      }
    },
    {
      id: 10,
      images: [
        "https://images.prop24.com/322243020/Crop508x373",
        "https://images.prop24.com/336371043/Crop600x400"
      ],
      property_type: "sale",
      price: 1400000,
      type: "Townhouse",
      category: "Residential",
      tagline: "Contemporary townhouse in a quiet neighborhood!",
      province: "Centurion",
      address: "15 New Dawn Street",
      description: "3 bedrooms, 2 bathrooms, private garden, and single garage.",
      rooms: 3,
      bathrooms: 2,
      garage: 1,
      size: 2100,
      rating: 4.4,
      status: true,
      agent: {
        id: 113,
        name: "Tom Wilson",
        contact: "0798765432",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        socials: {
          facebook: "https://facebook.com/tomwilson",
          instagram: "https://instagram.com/tomwilson",
          linkedin: "https://linkedin.com/in/tomwilson"
        }
      }
    },
    {
      id: 11,
      images: [
        "https://helium.privateproperty.co.za/live-za-images/property/1048/4/10409048/images/property-10409048-13830152_e.jpg",
        "https://i2.au.reastatic.net/800x600/509f21d241b8269fcdc05f2510196ee68de80124eafd4c800086a08a103308cb/image.jpg"
      ],
      property_type: "rental",
      price: 8500,
      type: "Flat",
      category: "Residential",
      tagline: "Affordable city living with great amenities!",
      province: "Johannesburg",
      address: "128 Market Street",
      description: "2 bedrooms, 1 bathroom, modern kitchen, and access to a communal pool.",
      rooms: 2,
      bathrooms: 1,
      garage: 1,
      size: 900,
      rating: 4.0,
      status: true,
      agent: {
        id: 114,
        name: "Oliver Brown",
        contact: "0712345678",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        socials: {
          facebook: "https://facebook.com/oliverbrown",
          instagram: "https://instagram.com/oliverbrown",
          linkedin: "https://linkedin.com/in/oliverbrown"
        }
      }
    },
    {
      id: 12,
      images: [
        "https://images.prop24.com/343614378/Crop600x400",
        "https://images.prop24.com/347675662/Crop600x400"
      ],
      property_type: "sale",
      price: 1600000,
      type: "House",
      category: "Residential",
      tagline: "Your dream home awaits in a gated community!",
      province: "Port Elizabeth",
      address: "45 Ocean View Road",
      description: "4 bedrooms, 3 bathrooms, swimming pool, and large garden.",
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      size: 3500,
      rating: 4.8,
      status: false,
      agent: {
        id: 115,
        name: "David Brown",
        contact: "0785678901",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        socials: {
          facebook: "https://facebook.com/davidbrown",
          instagram: "https://instagram.com/davidbrown",
          linkedin: "https://linkedin.com/in/davidbrown"
        }
      }
    },
    {
      id: 13,
      images: [
        "https://mcewanfraserlegal.imgix.net/property-images/mfl3228660_237.jpg?auto=format&crop=focalpoint&domain=mcewanfraserlegal.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=934&ixlib=php-3.3.0&q=100&w=1400&s=4d1792dbfaa637f8af34e673d1d52056",
        "https://media.rightmove.co.uk/dir/246k/245729/154915763/245729_EH67DJ_IMG_28_0000_max_656x437.jpeg"
      ],
      property_type: "sale",
      price: 800000,
      type: "Apartment",
      category: "Residential",
      tagline: "Convenient city center apartment!",
      province: "Pretoria Central",
      address: "88 Church Street",
      description: "2 bedrooms, 1 bathroom, well-maintained and close to public transport.",
      rooms: 2,
      bathrooms: 1,
      garage: 1,
      size: 700,
      rating: 4.3,
      status: true,
      agent: {
        id: 116,
        name: "Lucas Wright",
        contact: "0723456789",
        image: "https://randomuser.me/api/portraits/men/8.jpg",
        socials: {
          facebook: "https://facebook.com/lucaswright",
          instagram: "https://instagram.com/lucaswright",
          linkedin: "https://linkedin.com/in/lucaswright"
        }
      }
    },
    {
      id: 14,
      images: [
        "https://smartasset.com/wp-content/uploads/sites/2/2013/03/modern-custom-suburban-home-exterior-picture-id1255835529-1.jpg",
        "https://images.pexels.com/photos/324233/pexels-photo-324233.jpg"
      ],
      property_type: "sale",
      price: 1500000,
      type: "House",
      category: "Residential",
      tagline: "Cozy family home with plenty of space!",
      province: "Pretoria North",
      address: "89 Willow Avenue",
      description: "3 bedrooms, 2 bathrooms, spacious garden with pool.",
      rooms: 3,
      bathrooms: 2,
      garage: 2,
      size: 2700,
      rating: 4.6,
      status: true,
      agent: {
        id: 117,
        name: "Angela White",
        contact: "0745678910",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        socials: {
          facebook: "https://facebook.com/angelawhite",
          instagram: "https://instagram.com/angelawhite",
          linkedin: "https://linkedin.com/in/angelawhite"
        }
      }
    },
    {
      id: 15,
      images: [
        "https://images.pexels.com/photos/276467/pexels-photo-276467.jpeg",
        "https://images.pexels.com/photos/217206/pexels-photo-217206.jpg"
      ],
      property_type: "sale",
      price: 1300000,
      type: "Townhouse",
      category: "Residential",
      tagline: "Spacious townhouse in a quiet gated community.",
      province: "Durban",
      address: "24 Golden Avenue",
      description: "3 bedrooms, 2 bathrooms, and a private garden.",
      rooms: 3,
      bathrooms: 2,
      garage: 1,
      size: 1900,
      rating: 4.5,
      status: true,
      agent: {
        id: 118,
        name: "Rachel Scott",
        contact: "0715678901",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
        socials: {
          facebook: "https://facebook.com/rachelscott",
          instagram: "https://instagram.com/rachelscott",
          linkedin: "https://linkedin.com/in/rachelscott"
        }
      }
    }
  ]
}
