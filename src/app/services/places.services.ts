import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesService: google.maps.places.PlacesService | undefined;

  constructor() {
    this.loadGoogleMapsApi().then(() => {
      const mapDiv = document.createElement('div');
      if (window?.google?.maps?.places) {
        this.placesService = new google.maps.places.PlacesService(mapDiv);
      } else {
        console.error('Google Maps API not loaded');
      }
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }

  private loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('Loading Google Maps API: ' + window?.google?.maps?.places);
      if (window?.google?.maps?.places) {
        resolve();
        return;
      }
    });
  }

  searchNearby(location: google.maps.LatLngLiteral, radius: number, type: string): Promise<google.maps.places.PlaceResult[]> {
    if (!this.placesService) {
      return Promise.reject('PlacesService not initialized');
    }

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location),
      radius,
      type
    };

    return new Promise((resolve, reject) => {
      this.placesService!.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results || []);
        } else {
          reject(status);
        }
      });
    });
  }

  getDetails(request: google.maps.places.PlaceDetailsRequest): Promise<google.maps.places.PlaceResult> {
    if (!this.placesService) {
      return Promise.reject('PlacesService not initialized');
    }

    return new Promise((resolve, reject) => {
      this.placesService!.getDetails(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(result || {} as google.maps.places.PlaceResult);
        } else {
          reject(status);
        }
      });
    });
  }
}
