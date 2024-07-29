import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PopoverComponent } from './popover.component'
import { ElementRef } from '@angular/core'

describe('PopoverComponent', () => {
  let component: PopoverComponent
  let fixture: ComponentFixture<PopoverComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopoverComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent)
    component = fixture.componentInstance
    component.content = 'Test tooltip content'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize tippy instance on view init', () => {
    const elementRef = new ElementRef(document.createElement('div'))
    component.popoverContent = elementRef
    component.ngAfterViewInit()
    expect(component['tippyInstance']).toBeDefined()
  })

  it('should destroy tippy instance on destroy', () => {
    const elementRef = new ElementRef(document.createElement('div'))
    component.popoverContent = elementRef
    component.ngAfterViewInit()
    const destroySpy = spyOn(component['tippyInstance'], 'destroy')
    component.ngOnDestroy()
    expect(destroySpy).toHaveBeenCalled()
  })
})
