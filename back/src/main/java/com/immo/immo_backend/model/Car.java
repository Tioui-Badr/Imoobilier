package com.immo.immo_backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String plate;
    private String category;
    private Double price;
    private String fuel;
    private Integer seats;
    private Integer year;
    private String status;
    private String mileage;
    private String color;

    @ElementCollection
    @CollectionTable(name = "car_photos", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "photo_url")
    private List<String> photos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;

    public Car() {}

    public Car(String name, String plate, String category, Double price, String fuel, Integer seats, Integer year, String status, String mileage, String color, List<String> photos, Agency agency) {
        this.name = name;
        this.plate = plate;
        this.category = category;
        this.price = price;
        this.fuel = fuel;
        this.seats = seats;
        this.year = year;
        this.status = status;
        this.mileage = mileage;
        this.color = color;
        this.photos = photos;
        this.agency = agency;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getFuel() { return fuel; }
    public void setFuel(String fuel) { this.fuel = fuel; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMileage() { return mileage; }
    public void setMileage(String mileage) { this.mileage = mileage; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }

    public Agency getAgency() { return agency; }
    public void setAgency(Agency agency) { this.agency = agency; }
}
