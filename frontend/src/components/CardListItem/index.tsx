import React, { useContext, useEffect, useMemo } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { TouchableOpacity } from 'react-native'

import { Service } from '../../services/api'

import { toggleStar } from '../../store/actions'

import Cover from '../Cover'

import {
  Card,
  Header,
  Details,
  Line,
  Model,
  MakeYear,
  StarIcon,
} from './styles'
import { AuthContext } from '../../contexts/auth'

export interface CarProps {
  id: string
  model: string
  make: string
  year: string
  coverURL: string
  starred?: boolean
}

const CardListItem: React.FC<CarProps> = (car: CarProps) => {
  const { ip } = useContext(AuthContext)

  const service = useMemo(() => new Service(ip), [ip])

  const star = useSelector<RootStateOrAny>((state) => {
    return state.star.starred[car.id]
  })
  const dispatch = useDispatch()

  const _toggleStar = async () => {
    try {
      const payload = await service.toggleMarker(car.id)
      dispatch(toggleStar(car.id))
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    if (car?.starred) {
      dispatch(toggleStar(car.id))
    }
  }, [car?.starred]);

  return (
    <Card>
      <Cover source={car.coverURL} />
      <Details>
        <Header>
          <Model>{car.model}</Model>
          <TouchableOpacity onPress={() => _toggleStar()}>
            <StarIcon star={star} />
          </TouchableOpacity>
        </Header>
        <Line />
        <MakeYear>
          {car.make} | {car.year}
        </MakeYear>
      </Details>
    </Card>
  )
}

export default CardListItem
