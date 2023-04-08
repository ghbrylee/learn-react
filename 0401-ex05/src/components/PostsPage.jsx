import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Button} from 'react-bootstrap'

const PostsPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩중이 아닐 때 초기값을 false로 부여
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const getPosts = () => {
        setLoading(true); // 로딩이 시작됨
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let start=(page-1)*5 + 1;
            let end=(page*5);
            setList(json.filter(post=>post.id>=start && post.id<=end));
            setLast(Math.ceil(json.length/5));
            setLoading(false); //  데이터를 다 가져오면 false로 바뀜
        })
    }

    useEffect(()=>{
        getPosts();
    }, [page])

    if(loading) return <h1 className='text-center my-5'>로딩중입니다...</h1>

    return (
        <Row className='justify-content-center mx-3'>
            <Col className=''>
                <h1>게시글</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>ID.</td>
                            <td>Title</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(post=>
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>
                                    <div className='elipsis'>{post.title}</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className='text-center my-3'>
                    <Button 
                        disabled={page===1 && true}
                        onClick={()=>setPage(page-1)}>이전</Button>
                    <span className='px-3'>{page} / {last}</span>
                    <Button 
                        disabled={page===last && true}
                        onClick={()=>setPage(page+1)}>다음</Button>
                </div>
            </Col>
            
        </Row>
    )
}

export default PostsPage