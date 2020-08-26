import { ListComponent } from './list.component';
import { ComponentFixture } from '@angular/core/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  const provider = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];
  let store = {};
  store['unSelectedProviders'] = JSON.stringify(provider);
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(() => {
    component = new ListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('ngOnInit', () => {
    it('should set value of unselectedProviders to [] if values get from localstorage is null', () => {
      store['selectedProviders'] = JSON.stringify(provider);
      store['unSelectedProviders'] = JSON.stringify('');
      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem)
      component.ngOnInit();
      expect(JSON.stringify(component.unselectedProviders)).toBe(JSON.stringify([]));
      expect(JSON.stringify(component.selectedProviders)).toBe(JSON.stringify(provider));
    });
    it('should set value of selectedProviders to [] if values get from localstorage is null', () => {
      store['unSelectedProviders'] = JSON.stringify(provider);
      store['selectedProviders'] = JSON.stringify('');
      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem)
      component.ngOnInit();
      expect(JSON.stringify(component.selectedProviders)).toBe(JSON.stringify([]));
      expect(JSON.stringify(component.unselectedProviders)).toBe(JSON.stringify(provider));
    });
  });

  describe('toSelectedProviders', () => {
    it('should add value to selectedProviders ans remove from unselectedProviders', () => {
      const spy = spyOn(window.localStorage, 'setItem').and.callFake(() => {});
      const selectedProvider = provider[1];
      expect(component.selectedProviders.length).toEqual(0);
      expect(component.unselectedProviders.length).toEqual(3);
      component.toSelectedProviders(selectedProvider);
      expect(component.selectedProviders.length).toEqual(1);
      expect(JSON.stringify(component.selectedProviders)).toBe(JSON.stringify([selectedProvider]));
      expect(component.unselectedProviders.length).toEqual(2);
      expect(JSON.stringify(component.unselectedProviders)).not.toBe(JSON.stringify(provider));
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('toUnSelectedProviders', () => {
    it('should add value to unselectedProviders ans remove from selectedProviders', () => {
      component.selectedProviders = JSON.parse(JSON.stringify(provider));
      component.unselectedProviders = [];
      const spy = spyOn(window.localStorage, 'setItem').and.callFake(() => {});
      const unselectedProviders = provider[2];
      expect(component.selectedProviders.length).toEqual(3);
      expect(component.unselectedProviders.length).toEqual(0);
      component.toUnSelectedProviders(unselectedProviders);
      expect(component.unselectedProviders.length).toEqual(1);
      expect(JSON.stringify(component.unselectedProviders)).toBe(JSON.stringify([unselectedProviders]));
      expect(component.selectedProviders.length).toEqual(2);
      expect(JSON.stringify(component.selectedProviders)).not.toBe(JSON.stringify(provider));
      expect(spy).toHaveBeenCalled();
    });
  });
});
