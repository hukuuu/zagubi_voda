import { path } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors2 } from '../reducers/page2'
import { subtract } from 'ramda'
import {
  calculateReductorData,
  calculateReductorSummary
} from '../util/ReductorService'

const page5DataSelector = createSelector(
  [
    selectors2.pressureIndependentFlowAtMNFSelector,
    selectors1.minRowSelector,
    path(['page1']),
    path(['page2', 'pressureExponentN1'])
  ],
  (pressureIndependentFlowAtMNF, minRow, page1, pressureExponentN1) =>
    Object.values(page1).map(row =>
      calculateReductorData(
        pressureIndependentFlowAtMNF,
        minRow,
        row,
        pressureExponentN1,
        row.redukcijaNaVlezenPritisok
      )
    )
)

const sumProtok = state =>
  Object.values(state.page1).reduce(
    (sum, current) => sum + Number(current.protok),
    0
  )

const sumRekalkulaciq = createSelector(page5DataSelector, data =>
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

const reductorSummarySelector = createSelector(page5DataSelector, data => {
  const summary = calculateReductorSummary(data)
  return {
    maxReduciranSredenPritisok4: summary.maxReduciranSredenPritisok,
    maxReduciranKritichenPritisok4: summary.maxReduciranKritichenPritisok,
    sumRekalkulaciqNaVlezniotProtok4: summary.sumRekalkulaciqNaVlezniotProtok
  }
})

export const selectors = {
  page5DataSelector,
  zashtedaVodaM3Selector,
  zashtedaVodaPercent,
  reductorSummarySelector
}
