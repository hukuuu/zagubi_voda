import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from './page1'

const defaultState = {
  lengthOfMains: '',
  numberOfConnections: '',
  numberOfProperties: '',
  population: '',
  domesticNightUsePerPerson: 2,
  numberOfSmallNonDomesticUsers: '',
  averageUseOfSmallNonDomesticUsers: '',
  useByLargeNonDomesticUsers: '',
  backgroundLossesFromMains: 40,
  backgroundLossesFromConnections: 3,
  backgroundLossesFromProperties: 1,
  pressureExponentN1: 1,
  independentLossesPerConnection: 0.5,
  independentLossesPerProperty: 0.5,
  standardEquivalentServicePipeBurstAt50mPressure: 1.6
}

const totalNormalNightUseSelector = createSelector(
  [
    path(['page2', 'domesticNightUsePerPerson']),
    path(['page2', 'population']),
    path(['page2', 'numberOfSmallNonDomesticUsers']),
    path(['page2', 'averageUseOfSmallNonDomesticUsers']),
    path(['page2', 'useByLargeNonDomesticUsers'])
  ],
  (night, population, small, avg, large) =>
    (night * population) / 1000 + (small * avg) / 1000 + large / 1000
)

const totalBackgroundLeakegeAtActualPressureSelector = createSelector(
  [
    path(['page2', 'lengthOfMains']),
    path(['page2', 'backgroundLossesFromMains']),
    path(['page2', 'numberOfConnections']),
    path(['page2', 'backgroundLossesFromConnections']),
    path(['page2', 'numberOfProperties']),
    path(['page2', 'backgroundLossesFromProperties']),
    selectors1.minSredenSelector
  ],
  (
    lengthOfMains,
    backgroundLossesFromMains,
    numberOfConnections,
    backgroundLossesFromConnections,
    numberOfProperties,
    backgroundLossesFromProperties,
    averageZoneNightPressure
  ) =>
    ((lengthOfMains * backgroundLossesFromMains) / 1000 +
      (numberOfConnections * backgroundLossesFromConnections) / 1000 +
      (numberOfProperties * backgroundLossesFromProperties) / 1000) *
    Math.pow(averageZoneNightPressure / 50, 1.5)
)

const totalExpectedNightUseSelector = createSelector(
  [totalBackgroundLeakegeAtActualPressureSelector, totalNormalNightUseSelector],
  (totalBackgroundLeakegeAtActualPressure, totalNormalNightUse) =>
    totalBackgroundLeakegeAtActualPressure + totalNormalNightUse
)

const unaccountedLeakageForNightFlowSelector = createSelector(
  [selectors1.minProtokSelector, totalExpectedNightUseSelector],
  (measuredMinimumZoneNightFlow, totalExpectedNightUse) =>
    measuredMinimumZoneNightFlow - totalExpectedNightUse
)

const expectedNumberOfEquivalentServicePipeBurstsSelector = createSelector(
  [
    unaccountedLeakageForNightFlowSelector,
    path(['page2', 'standardEquivalentServicePipeBurstAt50mPressure']),
    selectors1.minSredenSelector
  ],
  (
    unaccountedLeakageForNightFlow,
    standardEquivalentServicePipeBurstAt50mPressure,
    averageZoneNightPressure
  ) => {
    const averageZoneNightPressureNumber = Number(averageZoneNightPressure)
    if (
      unaccountedLeakageForNightFlow === 0 ||
      averageZoneNightPressureNumber === 0 ||
      standardEquivalentServicePipeBurstAt50mPressure === 0
    )
      return 0
    return (
      unaccountedLeakageForNightFlow /
      (standardEquivalentServicePipeBurstAt50mPressure *
        Math.pow(averageZoneNightPressureNumber / 50, 1.5))
    )
  }
)

const pressureIndependentFlowAtMNFSelector = createSelector(
  [
    totalNormalNightUseSelector,
    path(['page2', 'independentLossesPerConnection']),
    path(['page2', 'numberOfConnections']),
    path(['page2', 'independentLossesPerProperty']),
    path(['page2', 'numberOfProperties'])
  ],
  (
    totalNormalNightUse,
    independentLossesPerConnection,
    numberOfConnections,
    independentLossesPerProperty,
    numberOfProperties
  ) =>
    totalNormalNightUse +
    (independentLossesPerConnection * numberOfConnections) / 1000 +
    (independentLossesPerProperty * numberOfProperties) / 1000
)

const pressureDependentFlowAtMNFSelector = createSelector(
  [selectors1.minProtokSelector, pressureIndependentFlowAtMNFSelector],
  (measuredMinimumZoneNightFlow, pressureIndependentFlowAtMNF) =>
    measuredMinimumZoneNightFlow - pressureIndependentFlowAtMNF
)

export const selectors = {
  totalNormalNightUseSelector,
  totalBackgroundLeakegeAtActualPressureSelector,
  totalExpectedNightUseSelector,
  unaccountedLeakageForNightFlowSelector,
  expectedNumberOfEquivalentServicePipeBurstsSelector,
  pressureDependentFlowAtMNFSelector,
  pressureIndependentFlowAtMNFSelector
}

const P2_UPDATE = 'P2_UPDATE'
export const updateAction = (key, val) => ({
  type: P2_UPDATE,
  key,
  val
})

const updateState = (state, { key, val }) => assocPath([key], val, state)

export default (state = defaultState, action) =>
  action.type === P2_UPDATE ? updateState(state, action) : state
