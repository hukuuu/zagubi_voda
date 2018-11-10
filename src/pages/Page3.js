import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Highlight from '../components/Highlight'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import round from '../util/round'
import { pageTitles } from '../util/constants'
import NumberInput from '../components/NumberInput'

import { updateAction, selectors } from '../reducers/page3'

const prev = { to: '/page2', tooltip: pageTitles.page2 }
const next = { to: '/page4', tooltip: pageTitles.page4 }

const Page3 = ({ data, derivedData, change }) => {
  return (
    <Page
      title={
        'Одредување на експонентот на притисок N1 со помош на  т.н. Step test'
      }
    >
      <Grid>
        <Row>
          <Col lg={10} sm={10} lgOffset={1} smOffset={1}>
            <PrevNext prev={prev} next={next}>
              <table>
                <tbody>
                  <tr>
                    <th>Опис</th>
                    <th>Почеток</th>
                    <th>Крај</th>
                    <th>Влез во систем</th>
                    <th>Среден притисок во зоната</th>
                    <th>Количини независни од работниот притисок во мрежата</th>
                    <th>Количини зависни од работниот притисок во мрежата</th>
                    <th colSpan={3}>Пресметка на N1</th>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />

                    <th>m3/h</th>
                    <th>m</th>
                    <th>m3/h</th>
                    <th>m3/h</th>
                    <th>Почеток</th>
                    <th>Фаза 1</th>
                    <th>Фаза 2</th>
                  </tr>
                  <tr>
                    <th>Почетни услови</th>
                    <td>
                      <NumberInput
                        value={data.pochetni.pochetok}
                        onChange={change('pochetni', 'pochetok')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.pochetni.krai}
                        onChange={change('pochetni', 'krai')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.pochetni.vlez}
                        onChange={change('pochetni', 'vlez')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.pochetni.sredenPritisok}
                        onChange={change('pochetni', 'sredenPritisok')}
                      />
                    </td>
                    <td>
                      {round(derivedData.pressureIndependentFlowAtMNF, 2)}
                    </td>
                    <td>{round(derivedData.pochetni.nezavisni, 2)}</td>
                    <td>{round(derivedData.pochetni.pochetokN1, 2)}</td>
                    <td>{round(derivedData.pochetni.faza1N1, 2)}</td>
                    <td>{round(derivedData.pochetni.faza2N1, 2)}</td>
                  </tr>
                  <tr>
                    <th>Чекор 1</th>
                    <td>
                      <NumberInput
                        value={data.chekor1.pochetok}
                        onChange={change('chekor1', 'pochetok')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor1.krai}
                        onChange={change('chekor1', 'krai')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor1.vlez}
                        onChange={change('chekor1', 'vlez')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor1.sredenPritisok}
                        onChange={change('chekor1', 'sredenPritisok')}
                      />
                    </td>
                    <td>
                      {round(derivedData.pressureIndependentFlowAtMNF, 2)}
                    </td>
                    <td>{round(derivedData.chekor1.nezavisni, 2)}</td>
                    <td>{round(derivedData.chekor1.pochetokN1, 2)}</td>
                    <td>{round(derivedData.chekor1.faza1N1, 2)}</td>
                    <td>{round(derivedData.chekor1.faza2N1, 2)}</td>
                  </tr>
                  <tr>
                    <th>Чекор 2</th>
                    <td>
                      <NumberInput
                        value={data.chekor2.pochetok}
                        onChange={change('chekor2', 'pochetok')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor2.krai}
                        onChange={change('chekor2', 'krai')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor2.vlez}
                        onChange={change('chekor2', 'vlez')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor2.sredenPritisok}
                        onChange={change('chekor2', 'sredenPritisok')}
                      />
                    </td>
                    <td>
                      {round(derivedData.pressureIndependentFlowAtMNF, 2)}
                    </td>
                    <td>{round(derivedData.chekor2.nezavisni, 2)}</td>
                    <td>{round(derivedData.chekor2.pochetokN1, 2)}</td>
                    <td>{round(derivedData.chekor2.faza1N1, 2)}</td>
                    <td>{round(derivedData.chekor2.faza2N1, 2)}</td>
                  </tr>
                  <tr>
                    <th>Чекор 3</th>
                    <td>
                      <NumberInput
                        value={data.chekor3.pochetok}
                        onChange={change('chekor3', 'pochetok')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor3.krai}
                        onChange={change('chekor3', 'krai')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor3.vlez}
                        onChange={change('chekor3', 'vlez')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor3.sredenPritisok}
                        onChange={change('chekor3', 'sredenPritisok')}
                      />
                    </td>
                    <td>
                      {round(derivedData.pressureIndependentFlowAtMNF, 2)}
                    </td>
                    <td>{round(derivedData.chekor3.nezavisni, 2)}</td>
                    <td>{round(derivedData.chekor3.pochetokN1, 2)}</td>
                    <td>{round(derivedData.chekor3.faza1N1, 2)}</td>
                    <td>{round(derivedData.chekor3.faza2N1, 2)}</td>
                  </tr>
                  <tr>
                    <th>Чекор 4</th>
                    <td>
                      <NumberInput
                        value={data.chekor4.pochetok}
                        onChange={change('chekor4', 'pochetok')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor4.krai}
                        onChange={change('chekor4', 'krai')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor4.vlez}
                        onChange={change('chekor4', 'vlez')}
                      />
                    </td>
                    <td>
                      <NumberInput
                        value={data.chekor4.sredenPritisok}
                        onChange={change('chekor4', 'sredenPritisok')}
                      />
                    </td>
                    <td>
                      {round(derivedData.pressureIndependentFlowAtMNF, 2)}
                    </td>
                    <td>{round(derivedData.chekor4.nezavisni, 2)}</td>
                    <td>{round(derivedData.chekor4.pochetokN1, 2)}</td>
                    <td>{round(derivedData.chekor4.faza1N1, 2)}</td>
                    <td>{round(derivedData.chekor4.faza2N1, 2)}</td>
                  </tr>
                </tbody>
              </table>
            </PrevNext>
          </Col>
        </Row>
      </Grid>
    </Page>
  )
}

const mstp = state => ({
  data: state.page3,
  derivedData: selectors.derivedDataSelector(state)
})

const mdtp = dispatch => ({
  change: (key1, key2) => val => dispatch(updateAction(key1, key2, val))
})

export default connect(
  mstp,
  mdtp
)(Page3)
