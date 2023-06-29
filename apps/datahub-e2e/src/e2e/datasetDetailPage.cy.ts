import 'cypress-real-events'

describe('organisations', () => {
  beforeEach(() => {
    // dataset without API, preview or downloads
    // cy.visit('/dataset/011963da-afc0-494c-a2cc-5cbd59e122e4')
    // dataset with map error
    // cy.visit('/dataset/6d0bfdf4-4e94-48c6-9740-3f9facfd453c')
    // dataset with stuff greyed out & unknown data types
    // cy.visit('/dataset/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
    // dataset with pretty much everything
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
  })

  describe('GENERAL : display & functions', () => {
    describe('header', () => {
      it('should display the title, favorite star group and arrow back', () => {
        cy.get('datahub-header-record')
          .children('header')
          .find('.font-title')
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
        cy.get('datahub-header-record')
          .children('header')
          .find('gn-ui-favorite-star')
        cy.get('datahub-header-record')
          .children('header')
          .find('gn-ui-navigation-button')
      })
      it('should return to the dataset list', () => {
        cy.get('datahub-header-record')
          .children('header')
          .find('gn-ui-navigation-button')
          .click()
        cy.url().should('include', '/home/search')
      })
    })
    describe('navigation bar', () => {
      it('should display the navigation  bar with 4 sections', () => {
        cy.get('datahub-navigation-bar')
          .find('button')
          .filter(':visible')
          .should('have.length', 4)
      })
      it('should scroll down/up to the clicked section', () => {
        cy.get('datahub-navigation-bar')
          .find('button')
          .filter(':visible')
          .as('navBtns')
        cy.get('@navBtns').eq(3).click()
        cy.get('gn-ui-data-otherlinks').should('be.visible')
      })
    })
  })

  describe('ABOUT SECTION : display & functions', () => {
    describe('display', () => {
      it('should display the description', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .find('gn-ui-content-ghost')
          .children('p')
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
      })
      it('should display the contact details', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .should('have.length', 2)
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('p')
          .eq(1)
          .invoke('text')
          .should('include', '@')
      })
      it('should display the catalog details', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-catalog')
          .children('div')
          .children('p')
          .eq(1)
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
      })
      it('should display the keywords', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .children('div')
          .eq(1)
          .children('gn-ui-badge')
          .should('have.length.gt', 0)
      })
      it('should display the lineage and usage tabs', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .find('gn-ui-expandable-panel')
      })
    })
    describe('functionnalities', () => {
      let targetLink
      let keyword
      it('should go to provider website on click', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .find('a')
          .as('proviLink')

        cy.get('@proviLink')
          .invoke('attr', 'href')
          .then((link) => {
            targetLink = link
            cy.get('@proviLink').invoke('removeAttr', 'target').click()
            cy.url().should('include', targetLink)
          })
      })
      it('should go to dataset search page when clicking on org name and filter by org', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .children('div')
          .first()
          .click()
        cy.url().should('include', '/home/search?publisher=')
      })
      it('should go to dataset search page when clicking on keyword and filter by keyword', () => {
        cy.get('gn-ui-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .children('div')
          .eq(1)
          .children('gn-ui-badge')
          .first()
          .as('keyword')

        cy.get('@keyword')
          .children('div')
          .then((key) => {
            keyword = key.text().toUpperCase()
            cy.get('@keyword').click()
            cy.url().should('include', '/home/search?q=')
            cy.get('gn-ui-fuzzy-search')
              .find('input')
              .should('have.value', keyword)
          })
      })
    })
  })

  describe('PREVIEW SECTION : display & functions', () => {
    beforeEach(() => {
      cy.get('gn-ui-record-metadata')
        .find('[id="preview"]')
        .first()
        .as('prevSection')
    })
    describe('display', () => {
      it('should display the tabs', () => {
        cy.get('@prevSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .should('have.length', 3)
      })
      it('should display the dataset dropdown with at least 1 option', () => {
        cy.get('@prevSection')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .children('option')
          .should('have.length.gt', 1)
      })
      it('should display the map', () => {
        cy.get('@prevSection').find('gn-ui-map').should('be.visible')
      })
      it('should display the table', () => {
        cy.get('@prevSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .click()
        cy.get('@prevSection').find('gn-ui-table').should('be.visible')
        cy.get('@prevSection')
          .find('tbody')
          .children('tr')
          .should('have.length.gt', 0)
      })
      it('should display the chart & dropdowns', () => {
        cy.get('@prevSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(2)
          .click()
        cy.get('@prevSection').find('gn-ui-chart').should('not.match', ':empty')
        cy.get('@prevSection')
          .find('gn-ui-chart-view')
          .find('gn-ui-dropdown-selector')
          .filter(':visible')
          .as('drop')
        cy.get('@drop').should('have.length', 4)
        cy.get('@drop').each((dropdown) => {
          cy.wrap(dropdown).find('option').should('have.length.greaterThan', 0)
        })
      })
    })
    describe('functionnalities', () => {
      it('MAP : should open a popup on layer click', () => {
        cy.get('@prevSection').find('canvas').realClick()
        cy.request({
          method: 'GET',
          url: ' https://www.geo2france.fr/geoserver/insee/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=rectangles_200m_menage_erbm&LAYERS=rectangles_200m_menage_erbm&INFO_FORMAT=application%2Fjson&I=249&J=65&WIDTH=296&HEIGHT=296&CRS=EPSG%3A3857&STYLES=&BBOX=-24459.849051256402%2C6237261.508070382%2C337545.9169073383%2C6599267.274028977',
          failOnStatusCode: false,
        })
        cy.get('@prevSection').find('gn-ui-feature-detail')
      })
      it('TABLE : should scroll', () => {
        cy.get('@prevSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .click()
        cy.get('@prevSection').find('gn-ui-table').find('table').as('table')
        cy.get('@table').scrollTo('bottom', { ensureScrollable: false })

        cy.get('@table').find('tr:last-child').should('be.visible')
      })
      it('CHART : should change the chart on options change', () => {
        cy.get('@prevSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(2)
          .click()
        cy.get('@prevSection')
          .find('gn-ui-chart-view')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .filter(':visible')
          .as('drop')
        cy.get('@drop').eq(0).select('pie chart')
        cy.get('@drop').eq(2).select('men')
        cy.get('@drop').eq(3).select('average')
        cy.get('@prevSection')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-type')
          .should('include', 'pie')
        cy.get('@prevSection')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-value-property')
          .should('include', 'average(men)')
      })
    })
  })

  describe.only('DOWNLOADS : display & functions', () => {
    describe('display', () => {
      it('should have at least one download button', () => {
        cy.get('gn-ui-data-downloads')
          .find('gn-ui-download-item')
          .should('have.length.gt', 0)
      })
      it('should have at least the "all" and "others" filter buttons', () => {
        cy.get('gn-ui-data-downloads')
          .find('gn-ui-button')
          .children('button')
          .then((btn) => {
            const buttons = btn.text()
            const btnList = []
            buttons.split(' ').map((btnVal) => btnList.push(btnVal.trim()))
            console.log(btnList)
            expect(btnList).to.include('All')
            expect(btnList).to.include('Others')
          })
      })
      it.only('should have one button per download type', () => {
        cy.get('gn-ui-data-downloads')
          .find('gn-ui-download-item')
          .find('a')
          .children('div')
          .children('div')
          .find('span')

        cy.get('gn-ui-data-downloads')
          .find('gn-ui-button')
          .children('button')
          .then((btn) => {
            const buttons = btn.text()
            const btnList = []
            buttons.split(' ').map((btnVal) => btnList.push(btnVal.trim()))
            console.log(btnList)
            expect(btnList).to.include('All')
            expect(btnList).to.include('Others')
          })
      })
    })
    describe('functionnalities', () => {
      it('', () => {
        cy.get('gn-ui-data-downloads').find('gn-ui-download-item')
      })
    })
  })
})
