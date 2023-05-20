import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query, setQuery] = useState('어모면사무소');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);

    const getLocal = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK 0643d1622ac8151e0c3c58f6f35889e8" },
            params: { query: query, page: page, size: 5 }
        }
        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end);
    }

    useEffect(() => { //페이지가 렌더링 될 때 호출
        getLocal();
    }, [page])

    const onSearch = (e) => {
        e.preventDefault(); // 바로 서브밋 되는걸 막아주기.
        getLocal();
        setPage(1);
    }

    return (
        <Row>
            <Row>
                <Col>
                    <h1 className='text-center my-5'>지역검색</h1>
                    <Row className='my-5'>
                        <Col md={5}>
                            <Form onSubmit={onSearch}>
                                <Form.Control
                                    value={query} placeholder='검색어' onChange={(e) => setQuery(e.target.value)}
                                />
                            </Form>
                        </Col>
                        <Col>
                            검색수 : {total} 건
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>장소명</td>
                                <td>전화</td>
                                <td>주소</td>
                                <td>위치</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local =>
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.phone}</td>
                                    <td>{local.address_name}</td>
                                    <td><MapPage local={local}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button disabled = {page ==1} onClick={()=>setPage(page-1)}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button disabled = {is_end} onClick={()=>setPage(page+1)}>다음</Button>
                    </div>
                </Col>
            </Row>
        </Row>
    )
}

export default LocalPage