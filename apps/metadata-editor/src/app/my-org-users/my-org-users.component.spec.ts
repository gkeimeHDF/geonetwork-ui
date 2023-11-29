import { MyOrgUsersComponent } from './my-org-users.component'
import { BehaviorSubject, of } from 'rxjs'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import {
  ORGANISATIONS_FIXTURE,
  USER_FIXTURE_ANON,
  USERS_FIXTURE,
} from '@geonetwork-ui/common/fixtures'
import { AuthService } from '@geonetwork-ui/api/repository/gn4'
import { SearchFacade } from '@geonetwork-ui/feature/search'

describe('MyOrgUsersComponent', () => {
  let component: MyOrgUsersComponent
  let searchFacade: SearchFacade
  let myOrgService: MyOrgService
  let authService: AuthService

  beforeEach(() => {
    const user = USER_FIXTURE_ANON()
    const allUsers = USERS_FIXTURE()

    const myOrgServiceMock = {
      myOrgData$: of({
        orgName: 'wizard-org',
        logoUrl: 'https://my-geonetwork.org/logo11.png',
        recordCount: 10,
        userCount: 3,
        userList: [
          {
            id: '161',
            profile: 'Administrator',
            username: 'ghost16',
            name: 'Ghost',
            surname: 'Old',
            email: 'old.ghost@wiz.fr',
            organisation: 'wizard-org',
            profileIcon:
              'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
          },
          {
            id: '3',
            profile: 'Editor',
            username: 'voldy63',
            name: 'Lord',
            surname: 'Voldemort',
            email: 'lord.voldy@wiz.com',
            organisation: 'wizard-org',
          },
          {
            id: '4',
            profile: 'Editor',
            username: 'al.dumble98',
            name: 'Albus',
            surname: 'Dumbledore',
            email: 'albus.dumble@wiz.com',
            organisation: 'wizard-org',
          },
        ],
      }),
    }

    const authServiceMock = {
      user$: new BehaviorSubject(user),
      allUsers$: new BehaviorSubject(allUsers),
    }

    const organisationsServiceMock = {
      organisations$: of(ORGANISATIONS_FIXTURE),
    }

    const searchFacadeMock = {
      resetSearch: jest.fn(),
    }

    myOrgService = myOrgServiceMock as any
    authService = authServiceMock as any
    searchFacade = searchFacadeMock as any

    component = new MyOrgUsersComponent(myOrgService, searchFacade)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Get organization users info', () => {
    it('should get the org name', () => {
      expect(component.orgData.orgName).toEqual('wizard-org')
    })

    it('should get the org logo', () => {
      expect(component.orgData.logoUrl).toEqual(
        'https://my-geonetwork.org/logo11.png'
      )
    })

    it('should get the list of users', () => {
      expect(component.orgData.userList).toEqual([
        {
          id: '161',
          profile: 'Administrator',
          username: 'ghost16',
          name: 'Ghost',
          surname: 'Old',
          email: 'old.ghost@wiz.fr',
          organisation: 'wizard-org',
          profileIcon:
            'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
        },
        {
          id: '3',
          profile: 'Editor',
          username: 'voldy63',
          name: 'Lord',
          surname: 'Voldemort',
          email: 'lord.voldy@wiz.com',
          organisation: 'wizard-org',
        },
        {
          id: '4',
          profile: 'Editor',
          username: 'al.dumble98',
          name: 'Albus',
          surname: 'Dumbledore',
          email: 'albus.dumble@wiz.com',
          organisation: 'wizard-org',
        },
      ])
    })
  })
})