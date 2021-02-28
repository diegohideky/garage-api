import React, { useState, useEffect, useContext, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { AuthContext } from '../../contexts/auth'
import { Service } from '../../services/api'
import CardListItem from '../../components/CardListItem'
import { Car } from './Car'
import { Space, Title } from './styles'

const Garage = () => {
  const { ip } = useContext(AuthContext)
  const service = useMemo(() => new Service(ip), [ip])
  const [data, setData] = useState<Car[]>([])

  useEffect(() => {
    const updateData = async () => {
      try {
        const payload = await service.getList()
        setData(payload.cars)
      } catch (error) {
        console.log({ error })
      }
    }

    if (ip) {
      updateData()
    }
  }, [ip])

  return (
    <ScrollView>
      <Title>Garage</Title>
      {data.map((item: Car, i: number) => (
        <div key={i}>
          <CardListItem
            id={item.id}
            model={item.model}
            make={item.make}
            year={item.year}
            coverURL={item?.image}
            starred={item?.marked}
          />
          <Space />
        </div>
      ))}
    </ScrollView>
  )
}

export default Garage
