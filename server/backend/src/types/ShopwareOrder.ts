/* eslint-disable @typescript-eslint/no-explicit-any */
export type ShopwareOrder = {
  Shopware: Shopware
  _symfony_flashes: any
  _sf2_meta: { u: number; c: number; l: number }
  deliveryDay: string
  slotHours: string
  userComment?: string
  orderNumber?: string
}

type Shopware = {
  sessionId: string
  'auto-user': 1
  Bot: boolean
  sOutputNet: boolean
  userInfo: {
    firstname: string
    lastname: string
    email: string
    salutation: string
    title: any
    birthday: any
    accountmode: string
  }
  'Shopware\\Components\\Captcha\\DefaultCaptcha_sRandom': { nAQ6k: boolean; PqPgk: boolean }
  sRegister: { billing: { country: 2 } }
  sBasketCurrency: 1
  sBasketQuantity: 0
  sBasketAmount: 0
  sCountry: string
  sArea: string
  sDispatch: 9
  sPaymentID: 5
  sState: any
  taxFree: boolean
  sUserMail: string
  sUserPasswordChangeDate: string
  sUserId: 1
  sNotesQuantity: 0
  sUserGroup: string
  sUserGroupData: {
    id: string
    groupkey: string
    description: string
    tax: string
    taxinput: string
    mode: string
    discount: string
    minimumorder: string
    minimumordersurcharge: string
  }
  sOrderVariables: {
    swagSloganFontSize: 12
    swagSloganItalic: boolean
    swagSloganContent: any
    postal: string
    deliverySlots: string
    sUserLoggedIn: boolean
    sUserData: {
      billingaddress: {
        id: 2
        company: any
        department: any
        salutation: string
        firstname: string
        title: any
        lastname: string
        street: string
        zipcode: string
        city: string
        phone: any
        vatId: any
        additionalAddressLine1: any
        additionalAddressLine2: any
        countryId: 2
        stateId: any
        customer: { id: 1 }
        country: { id: 2 }
        state: any
        userID: 1
        countryID: 2
        stateID: any
        ustid: any
        additional_address_line1: any
        additional_address_line2: any
        attributes: {
          id: 2
          customerAddressId: 2
          text1: any
          text2: any
          text3: any
          text4: any
          text5: any
          text6: any
          customer_address: { id: 2 }
        }
      }
      additional: {
        country: {
          id: string
          countryname: string
          countryiso: string
          areaID: string
          countryen: string
          position: string
          notice: string
          taxfree: string
          taxfree_ustid: string
          taxfree_ustid_checked: string
          active: string
          iso3: string
          display_state_in_registration: string
          force_state_in_registration: string
          allow_shipping: string
          countryarea: string
        }
        state: []
        user: {
          id: string
          userID: string
          password: string
          encoder: string
          email: string
          active: string
          accountmode: string
          confirmationkey: string
          paymentID: string
          doubleOptinRegister: string
          doubleOptinEmailSentDate: any
          doubleOptinConfirmDate: any
          firstlogin: string
          lastlogin: string
          sessionID: string
          newsletter: number
          validation: string
          affiliate: string
          customergroup: string
          paymentpreset: string
          language: string
          subshopID: string
          referer: string
          pricegroupID: any
          internalcomment: string
          failedlogins: string
          lockeduntil: any
          default_billing_address_id: string
          default_shipping_address_id: string
          title: any
          salutation: string
          firstname: string
          lastname: string
          birthday: any
          customernumber: string
          login_token: string
          changed: string
          password_change_date: string
          register_opt_in_id: any
        }
        countryShipping: {
          id: string
          countryname: string
          countryiso: string
          areaID: string
          countryen: string
          position: string
          notice: string
          taxfree: string
          taxfree_ustid: string
          taxfree_ustid_checked: string
          active: string
          iso3: string
          display_state_in_registration: string
          force_state_in_registration: string
          allow_shipping: string
          countryarea: string
        }
        stateShipping: []
        payment: {
          id: string
          name: string
          description: string
          template: string
          class: string
          table: string
          hide: string
          additionaldescription: string
          debit_percent: string
          surcharge: string
          surchargestring: string
          position: string
          active: string
          esdactive: string
          embediframe: string
          hideprospect: string
          action: any
          pluginID: any
          source: any
          mobile_inactive: string
          attributes: []
          validation: []
        }
        charge_vat: boolean
        show_net: boolean
      }
      shippingaddress: {
        id: 2
        company: any
        department: any
        salutation: string
        firstname: string
        title: any
        lastname: string
        street: string
        zipcode: string
        city: string
        phone: any
        vatId: any
        additionalAddressLine1: any
        additionalAddressLine2: any
        countryId: 2
        stateId: any
        customer: { id: 1 }
        country: { id: 2 }
        state: any
        userID: 1
        countryID: 2
        stateID: any
        ustid: any
        additional_address_line1: any
        additional_address_line2: any
        attributes: {
          id: 2
          customerAddressId: 2
          text1: any
          text2: any
          text3: any
          text4: any
          text5: any
          text6: any
          customer_address: { id: 2 }
        }
      }
    }
    sCountry: {
      id: string
      countryname: string
      countryiso: string
      areaID: string
      countryen: string
      position: string
      notice: string
      taxfree: string
      taxfree_ustid: string
      taxfree_ustid_checked: string
      active: string
      iso3: string
      display_state_in_registration: string
      force_state_in_registration: string
      allow_shipping: string
      countryarea: string
    }
    sState: { id: any }
    sPayment: {
      id: string
      name: string
      description: string
      template: string
      class: string
      table: string
      hide: string
      additionaldescription: string
      debit_percent: string
      surcharge: string
      surchargestring: string
      position: string
      active: string
      esdactive: string
      embediframe: string
      hideprospect: string
      action: any
      pluginID: any
      source: any
      mobile_inactive: string
      attributes: []
      validation: []
    }
    sDispatch: {
      id: string
      name: string
      description: string
      calculation: string
      status_link: string
      instock: string
      stockmin: string
      laststock: string
      weight: string
      count_article: string
      shippingfree: string
      amount: string
      amount_net: string
      amount_display: string
      length: string
      height: string
      width: string
      userID: string
      has_topseller: string
      has_comment: string
      has_esd: string
      max_tax: string
      basketStateId: string
      countryID: string
      paymentID: string
      customergroupID: string
      multishopID: string
      sessionID: string
      attribute: []
    }
    sPayments: {
      '5': {
        id: string
        name: string
        description: string
        template: string
        class: string
        table: string
        hide: string
        additionaldescription: string
        debit_percent: string
        surcharge: string
        surchargestring: string
        position: string
        active: string
        esdactive: string
        embediframe: string
        hideprospect: string
        action: any
        pluginID: any
        source: any
        mobile_inactive: string
        attributes: []
      }
    }
    sDispatches: {
      [key: string]: {
        id: string
        name: string
        description: string
        calculation: string
        status_link: string
        instock: string
        stockmin: string
        laststock: string
        weight: string
        count_article: string
        shippingfree: string
        amount: string
        amount_net: string
        amount_display: string
        length: string
        height: string
        width: string
        userID: string
        has_topseller: string
        has_comment: string
        has_esd: string
        max_tax: string
        basketStateId: string
        countryID: string
        paymentID: string
        customergroupID: string
        multishopID: string
        sessionID: string
        attribute: []
      }
    }
    sBasketProportional: {
      content: [
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            rexglas_gross: string
            rexglas_klein: string
            articleID: 10
            articleDetailsID: 10
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: 1
            tax: 19
            instock: 200
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: 1
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: 0
            height: 0
            width: 0
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: 5
            filtergroupID: 2
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 0.5
            referenceunit: 1
            packunit: string
            unitID: 1
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 12
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 0.5
                referenceunit: 1
                packunit: string
                unitID: 1
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: {
              [key: string]: {
                id: 3
                optionID: 3
                name: string
                groupID: 2
                groupName: string
                value: string
                values: { [key: string]: string }
                isFilterable: boolean
                options: [
                  { id: 10; name: string; attributes: [] },
                  { id: 11; name: string; attributes: [] },
                  { id: 8; name: string; attributes: [] }
                ]
                media: []
                attributes: []
              }
            }
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 12
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: {
              '0': string
              '1': string
              '2': string
              original: string
            }
            srchd: {
              '0': string
              '1': string
              '2': string
              original: string
            }
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        },
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            rexglas_gross: string
            rexglas_klein: string
            articleID: 12
            articleDetailsID: 12
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: 1
            tax: 19
            instock: 10
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: 0
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: 0
            height: 0
            width: 0
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: 1
            filtergroupID: 2
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 500
            referenceunit: 500
            packunit: string
            unitID: 2
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 3
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 500
                referenceunit: 500
                packunit: string
                unitID: 2
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: {
              '3': {
                id: 3
                optionID: 3
                name: string
                groupID: 2
                groupName: string
                value: string
                values: { string: string }
                isFilterable: boolean
                options: [{ id: 12; name: string; attributes: [] }]
                media: []
                attributes: []
              }
              '5': {
                id: 5
                optionID: 5
                name: string
                groupID: 2
                groupName: string
                value: string
                values: any
                isFilterable: boolean
                options: [
                  {
                    id: number
                    name: string
                    attributes: []
                  }
                ]
                media: []
                attributes: []
              }
            }
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 3
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: any
            srchd: any
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        }
      ]
      Amount: string
      AmountNet: string
      Quantity: 2
      AmountNumeric: 13.9
      AmountNetNumeric: 11.68
      AmountWithTax: string
      AmountWithTaxNumeric: 0
      sCurrencyId: 1
      sCurrencyName: string
      sCurrencyFactor: 1
      sShippingcostsWithTax: 3.9
      sShippingcostsNet: 3.28
      sShippingcostsTax: 19
      sShippingcostsDifference: any
      sTaxRates: { string: 2.22 }
      sShippingcosts: 3.9
      sAmount: 13.9
      sAmountTax: 2.22
    }
    sBasket: {
      content: [
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            rexglas_klein: string
            rexglas_gross: string
            articleID: number
            articleDetailsID: number
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: number
            tax: number
            instock: number
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: number
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: number
            height: number
            width: number
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: number
            filtergroupID: number
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 0.5
            referenceunit: 1
            packunit: string
            unitID: 1
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 12
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 0.5
                referenceunit: 1
                packunit: string
                unitID: 1
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: any
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 12
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: any
            srchd: any
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        },
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            rexglas_gross: string
            rexglas_klein: string
            articleID: 12
            articleDetailsID: 12
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: 1
            tax: 19
            instock: 10
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: 0
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: 0
            height: 0
            width: 0
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: 1
            filtergroupID: 2
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 500
            referenceunit: 500
            packunit: string
            unitID: 2
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 3
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 500
                referenceunit: 500
                packunit: string
                unitID: 2
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: any
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 3
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: any
            srchd: any
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        }
      ]
      Amount: string
      AmountNet: string
      Quantity: 2
      AmountNumeric: 13.9
      AmountNetNumeric: 11.68
      AmountWithTax: string
      AmountWithTaxNumeric: 0
      sCurrencyId: 1
      sCurrencyName: string
      sCurrencyFactor: 1
      sShippingcostsWithTax: 3.9
      sShippingcostsNet: 3.28
      sShippingcostsTax: 19
      sShippingcostsDifference: any
      sTaxRates: { string: 2.22 }
      sShippingcosts: 3.9
      sAmount: 13.9
      sAmountTax: 2.22
    }
    sInvalidCartItems: []
    sLaststock: {
      hideBasket: boolean
      articles: {
        SW10010: { OutOfStock: boolean }
        SW10012: { OutOfStock: boolean }
      }
    }
    sShippingcosts: 3.9
    sShippingcostsDifference: any
    sAmount: 13.9
    sAmountWithTax: any
    sAmountTax: 2.22
    sAmountNet: 11.68
    sPremiums: []
    sNewsletter: any
    sComment: any
    sShowEsdNote: boolean
    sDispatchNoOrder: boolean
    sRegisterFinished: boolean
    sBasketView: {
      content: [
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            articleID: 10
            articleDetailsID: 10
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: 1
            tax: 19
            instock: 200
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: 1
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: 0
            height: 0
            width: 0
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: 5
            filtergroupID: 2
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 0.5
            referenceunit: 1
            packunit: string
            unitID: 1
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 12
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 0.5
                referenceunit: 1
                packunit: string
                unitID: 1
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: any
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 12
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: any
            srchd: any
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        },
        {
          id: string
          sessionID: string
          userID: string
          articlename: string
          articleID: string
          ordernumber: string
          shippingfree: string
          quantity: string
          price: string
          netprice: string
          tax_rate: string
          datum: string
          modus: string
          esdarticle: string
          partnerID: string
          lastviewport: string
          useragent: string
          config: string
          currencyFactor: string
          packunit: string
          mainDetailId: string
          articleDetailId: string
          minpurchase: string
          taxID: string
          instock: string
          suppliernumber: string
          maxpurchase: string
          purchasesteps: 1
          purchaseunit: string
          unitID: string
          laststock: string
          shippingtime: any
          releasedate: any
          sReleaseDate: any
          ean: string
          stockmin: string
          ob_attr1: string
          ob_attr2: any
          ob_attr3: any
          ob_attr4: any
          ob_attr5: any
          ob_attr6: any
          __s_order_basket_attributes_id: string
          __s_order_basket_attributes_basketID: string
          __s_order_basket_attributes_attribute1: string
          __s_order_basket_attributes_attribute2: any
          __s_order_basket_attributes_attribute3: any
          __s_order_basket_attributes_attribute4: any
          __s_order_basket_attributes_attribute5: any
          __s_order_basket_attributes_attribute6: any
          shippinginfo: boolean
          esd: string
          additional_details: {
            articleID: 12
            articleDetailsID: 12
            ordernumber: string
            highlight: boolean
            description: string
            description_long: string
            esd: boolean
            articleName: string
            taxID: 1
            tax: 19
            instock: 10
            isAvailable: boolean
            hasAvailableVariant: boolean
            weight: 0
            shippingtime: any
            pricegroupActive: boolean
            pricegroupID: any
            length: 0
            height: 0
            width: 0
            laststock: boolean
            additionaltext: string
            datum: string
            update: string
            sales: 1
            filtergroupID: 2
            priceStartingFrom: any
            pseudopricePercent: any
            sVariantArticle: any
            sConfigurator: boolean
            metaTitle: string
            shippingfree: boolean
            suppliernumber: string
            notification: boolean
            ean: string
            keywords: string
            sReleasedate: string
            template: string
            attributes: {
              core: {
                id: string
                articledetailsID: string
                attr1: string
                attr2: string
                attr3: string
                attr4: any
                attr5: any
                attr6: any
                attr7: any
                attr8: any
                attr9: any
                attr10: any
                attr11: any
                attr12: any
                attr13: any
                attr14: any
                attr15: any
                attr16: any
                attr17: any
                attr18: any
                attr19: any
                attr20: any
              }
              marketing: {
                isNew: boolean
                isTopSeller: boolean
                comingSoon: boolean
                storage: []
              }
            }
            allowBuyInListing: boolean
            attr1: string
            attr2: string
            attr3: string
            attr4: any
            attr5: any
            attr6: any
            attr7: any
            attr8: any
            attr9: any
            attr10: any
            attr11: any
            attr12: any
            attr13: any
            attr14: any
            attr15: any
            attr16: any
            attr17: any
            attr18: any
            attr19: any
            attr20: any
            supplierName: string
            supplierImg: any
            supplierID: 2
            supplierDescription: string
            supplierMedia: any
            supplier_attributes: []
            newArticle: boolean
            sUpcoming: boolean
            topseller: boolean
            valFrom: 1
            valTo: any
            from: 1
            to: any
            price: string
            pseudoprice: string
            referenceprice: string
            has_pseudoprice: boolean
            price_numeric: 5
            pseudoprice_numeric: 0
            price_attributes: []
            pricegroup: string
            minpurchase: 1
            maxpurchase: string
            purchasesteps: 1
            purchaseunit: 500
            referenceunit: 500
            packunit: string
            unitID: 2
            sUnit: { unit: string; description: string }
            unit_attributes: []
            image: {
              id: 3
              position: any
              source: string
              description: string
              extension: string
              main: boolean
              parentId: any
              width: 1280
              height: 1280
              thumbnails: [
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                },
                {
                  source: string
                  retinaSource: string
                  sourceSet: string
                  maxWidth: string
                  maxHeight: string
                  attributes: []
                }
              ]
              attributes: []
              attribute: []
            }
            prices: [
              {
                valFrom: 1
                valTo: any
                from: 1
                to: any
                price: string
                pseudoprice: string
                referenceprice: string
                pseudopricePercent: any
                has_pseudoprice: boolean
                price_numeric: 5
                pseudoprice_numeric: 0
                price_attributes: []
                pricegroup: string
                minpurchase: 1
                maxpurchase: string
                purchasesteps: 1
                purchaseunit: 500
                referenceunit: 500
                packunit: string
                unitID: 2
                sUnit: { unit: string; description: string }
                unit_attributes: []
              }
            ]
            linkBasket: string
            linkDetails: string
            linkVariant: string
            sProperties: {
              '3': {
                id: 3
                optionID: 3
                name: string
                groupID: 2
                groupName: string
                value: string
                values: { string: string }
                isFilterable: boolean
                options: [{ id: 12; name: string; attributes: [] }]
                media: []
                attributes: []
              }
              '5': {
                id: 5
                optionID: 5
                name: string
                groupID: 2
                groupName: string
                value: string
                values: any
                isFilterable: boolean
                options: [
                  {
                    id: 22
                    name: string
                    attributes: []
                  },
                  {
                    id: 23
                    name: string
                    attributes: []
                  }
                ]
                media: []
                attributes: []
              }
            }
            properties: string
          }
          itemUnit: string
          amount: string
          purchaseunitTemp: string
          itemInfo: string
          itemInfoArray: {
            reference: 1
            unit: { unit: string; description: string }
            price: string
          }
          amountnet: string
          priceNumeric: string
          amountNumeric: 5
          amountnetNumeric: 4.2016806722689
          image: {
            id: 3
            position: any
            source: string
            description: string
            extension: string
            main: boolean
            parentId: any
            width: 1280
            height: 1280
            thumbnails: [
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              },
              {
                source: string
                retinaSource: string
                sourceSet: string
                maxWidth: string
                maxHeight: string
                attributes: []
              }
            ]
            attributes: []
            attribute: []
            src: {
              '0': string
              '1': string
              '2': string
              original: string
            }
            srchd: {
              '0': string
              '1': string
              '2': string
              original: string
            }
            res: { original: { width: 1280; height: 1280 } }
          }
          linkDetails: string
          linkDelete: string
          linkNote: string
          tax: string
        }
      ]
      Amount: string
      AmountNet: string
      Quantity: 2
      AmountNumeric: 13.9
      AmountNetNumeric: 11.68
      AmountWithTax: string
      AmountWithTaxNumeric: 0
      sCurrencyId: 1
      sCurrencyName: string
      sCurrencyFactor: 1
      sShippingcostsWithTax: 3.9
      sShippingcostsNet: 3.28
      sShippingcostsTax: 19
      sShippingcostsDifference: any
      sTaxRates: { string: 2.22 }
      sShippingcosts: 3.9
      sAmount: 13.9
      sAmountTax: 2.22
    }
    sOrderNumber: string
    confirmMailDeliveryFailed: boolean
  }
}
