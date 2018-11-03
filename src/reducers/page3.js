import { path } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors2 } from '../reducers/page2'
import { subtract } from 'ramda'
import {
  calculateReductorData,
  calculateReductorSummary
} from '../util/ReductorService'

const redukcijaNaVlezenPritisokSelector = path([
  'page3',
  'redukcijaNaVlezenPritisok'
])

const page3DataSelector = createSelector(
  [
    selectors2.pressureIndependentFlowAtMNFSelector,
    selectors1.minRowSelector,
    path(['page1']),
    path(['page2', 'pressureExponentN1']),
    redukcijaNaVlezenPritisokSelector
  ],
  (
    pressureIndependentFlowAtMNF,
    minRow,
    page1,
    pressureExponentN1,
    redukcijaNaVlezenPritisok
  ) =>
    Object.values(page1).map(row =>
      calculateReductorData(
        pressureIndependentFlowAtMNF,
        minRow,
        row,
        pressureExponentN1,
        redukcijaNaVlezenPritisok
      )
    )
)

const sumProtok = state =>
  Object.values(state.page1).reduce(
    (sum, current) => sum + Number(current.protok),
    0
  )

const sumRekalkulaciq = createSelector(page3DataSelector, data =>
  data.reduce(
    (sum, current) => sum + Number(current.rekalkulaciqNaVlezniotProtok || 0),
    0
  )
)

const zashtedaVodaM3Selector = createSelector(
  [sumProtok, sumRekalkulaciq],
  subtract
)

const zashtedaVodaPercent = createSelector(
  [sumProtok, sumRekalkulaciq],
  (a, b) => (b === 0 ? 0 : (a / b - 1) * 100)
)

const reductorSummarySelector = createSelector(page3DataSelector, data => {
  const summary = calculateReductorSummary(data)
  return {
    maxReduciranSredenPritisok3: summary.maxReduciranSredenPritisok,
    maxReduciranKritichenPritisok3: summary.maxReduciranKritichenPritisok,
    sumRekalkulaciqNaVlezniotProtok3: summary.sumRekalkulaciqNaVlezniotProtok
  }
})

export const selectors = {
  redukcijaNaVlezenPritisokSelector,
  page3DataSelector,
  zashtedaVodaM3Selector,
  zashtedaVodaPercent,
  reductorSummarySelector
}

const P3_UPDATE = 'P3_UPDATE'
export const updateAction = val => ({
  type: P3_UPDATE,
  val
})

const updateState = (state, { val }) => ({
  redukcijaNaVlezenPritisok: val
})

const defaultState = {
  redukcijaNaVlezenPritisok: ''
}
export default (state = defaultState, action) =>
  action.type === P3_UPDATE ? updateState(state, action) : state
