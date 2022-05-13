import { Button, Container, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [title, setTitle] = useState('')
  const [point, setPoint] = useState('')
  const [link, setLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onChangeLink = (e) => {
    setLink(e.target.value);
  }
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      url: link
    }
    try {
      setIsLoading(true)
      const res = await axios.post('api/points', data)
      setTitle(res.data.title)
      setPoint(res.data.points)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <Container align="center" mt="8">
      <Text align="center" fontSize="3xl" fontWeight="bold">{title}</Text>
      <Text align="center" mb="8" fontSize="3xl" fontWeight="bold" color="yellow.500">{point} points</Text>
      <form onSubmit={submitForm}>
        <Input onChange={onChangeLink} placeholder='large size' size='lg' />
        <Button
          type='submit'
          isLoading={isLoading ? true : false}
          loadingText='Fetching'
          mt="5"
          alignContent="center"
          colorScheme='teal'
          variant='solid'>
          Fetch Data
        </Button>
      </form>
    </Container>
  )
}
