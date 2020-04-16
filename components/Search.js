import React, { useState, useEffect } from 'react'
import {
  Container,
  Header,
  Title,
  Content,
  Form,
  Item,
  Picker,
  Button,
  Text
} from 'native-base'

const Search = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [course, setCourse] = useState(null)
  const [semester, setSemester] = useState(null)
  const [period, setPeriod] = useState(null)
  const [searchError, setError] = useState(null)

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const handleCourse = (value) => {
    setCourse(value)
  }

  const handleSemester = (value) => {
    setSemester(value)
  }

  const handlePeriod = (value) => {
    setPeriod(value)
  }

  const allCourses = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/api/cursos", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCourses([
          ...result
        ])
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    allCourses()
  })

  const consulta = () => {
    const query = `curso=${course ? course : ''}&period=${period ? period : ''}&semestre=${semester ? semester : ''}`
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8000/api/cursos?${query}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSelectedCourse({...result})
      })
      .catch(error => {
        setError("Curso não encontrado")
        setSelectedCourse(null)
      });
  }

  return (
    <Container>
      <Header>
        <Title>UniSalas</Title>
      </Header>
      <Content contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Form>

          {
            courses.length ? (
              <div>
                <Item picker>
                  <Picker
                    //mode="dropdown"
                    placeholder="Selecione o curso"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={course}
                    onValueChange={handleCourse}
                  >
                    {courses.map(c => <Picker.Item label={c.curso} value={c.curso} key={c.id}/>)}
                  </Picker>
                </Item>

                <Item picker>
                  <Picker
                    //mode="dropdown"
                    placeholder="Selecione o semestre"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={semester}
                    onValueChange={handleSemester}
                  >
                  {semesters.map(semestre => <Picker.Item label={semestre} value={semestre} />)}
                  </Picker>
                </Item>

                <Item picker>
                  <Picker
                    //mode="dropdown"
                    placeholder="Selecione um período"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={period}
                    onValueChange={handlePeriod}
                  >
                    <Picker.Item label="manhã" value="manhã" />
                    <Picker.Item label="noturno" value="noturno" />
                  </Picker>
                </Item>
                </div>
            ) : null
          }

          <Button
            style={{ marginTop: 48 }}
            onPress={consulta}
          >
            <Text>Buscar</Text>
          </Button>

          {selectedCourse ? (
            <div>
                <p><Text>Bloco: {selectedCourse.bloco}</Text></p>
                <p><Text>Andar: {selectedCourse.andar}</Text></p>
                <p><Text>Sala: {selectedCourse.sala}</Text></p>
            </div>) : null
          }
          {searchError ? <div>{searchError}</div> : null}
          
        </Form>
      </Content>
    </Container>
  )
}

export default Search
