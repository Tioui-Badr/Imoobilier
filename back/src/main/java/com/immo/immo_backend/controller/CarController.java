package com.immo.immo_backend.controller;

import com.immo.immo_backend.dto.CarDTO;
import com.immo.immo_backend.model.Agency;
import com.immo.immo_backend.model.Car;
import com.immo.immo_backend.repository.AgencyRepository;
import com.immo.immo_backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private AgencyRepository agencyRepository;

    @GetMapping
    public List<CarDTO> getAllCars() {
        return carService.getAllCars().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<CarDTO> searchCars(@RequestParam String query) {
        return carService.searchCars(query).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/agency/{agencyId}")
    public List<CarDTO> getCarsByAgency(@PathVariable Long agencyId) {
        return carService.getCarsByAgency(agencyId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<CarDTO> saveCar(@RequestBody CarDTO carDTO) {
        Agency agency = agencyRepository.findById(carDTO.getAgencyId())
                .orElseThrow(() -> new RuntimeException("Agency not found"));

        Car car = convertToEntity(carDTO);
        car.setAgency(agency);
        
        Car savedCar = carService.saveCar(car);
        return ResponseEntity.ok(convertToDTO(savedCar));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }

    private CarDTO convertToDTO(Car car) {
        CarDTO dto = new CarDTO();
        dto.setId(car.getId());
        dto.setName(car.getName());
        dto.setPlate(car.getPlate());
        dto.setCategory(car.getCategory());
        dto.setPrice(car.getPrice());
        dto.setFuel(car.getFuel());
        dto.setSeats(car.getSeats());
        dto.setYear(car.getYear());
        dto.setStatus(car.getStatus());
        dto.setMileage(car.getMileage());
        dto.setColor(car.getColor());
        dto.setPhotos(car.getPhotos());
        dto.setAgencyId(car.getAgency().getId());
        return dto;
    }

    private Car convertToEntity(CarDTO dto) {
        Car car = new Car();
        if (dto.getId() != null) car.setId(dto.getId());
        car.setName(dto.getName());
        car.setPlate(dto.getPlate());
        car.setCategory(dto.getCategory());
        car.setPrice(dto.getPrice());
        car.setFuel(dto.getFuel());
        car.setSeats(dto.getSeats());
        car.setYear(dto.getYear());
        car.setStatus(dto.getStatus());
        car.setMileage(dto.getMileage());
        car.setColor(dto.getColor());
        car.setPhotos(dto.getPhotos());
        return car;
    }
}
