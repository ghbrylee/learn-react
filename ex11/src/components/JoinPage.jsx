import React from 'react'
import { useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import { app } from '../firebaseInit';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { Link } from 'react-router-dom'
import {getFirestore, doc, setDoc} from 'firebase/firestore'


const JoinPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth=getAuth(app);
    const db = getFirestore(app); //app에 이니셜라이즈 정보 담겨있음
    const [form, setForm] = useState({
        email:'geonhwi@inha.com',
        password:'123456'
    });
    const {email, password} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onJoin = () => {
        if(!window.confirm('회원으로 등록하실래요?')) return;
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(async success=>{
            //console.log('success....', success)
            const uid = success.user.uid;
            await setDoc(doc(db, 'user', uid), {
                email : email,
                name : '이건휘',
                address : '경기도 하남시 미사강변중앙로',
                phone : '010-1234-8471',
                photo : 'https://play-lh.googleusercontent.com/PvupwmhHTMLh2Cjab4shmRwt1vvEOiULqymc1tv74Zoyb58dVocn9vZ7RM_02vei1yRu'
            });
            setLoading(false);
            history.push('/login');
        })
        .catch(error=>{
            setLoading(false);
            alert('에러:' + error.message);
        });
    }

    if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row className='justify-content-center my-5'>
        <Col md={5}>
            <h1 className='text-center'>회원등록</h1>
            <Card className='p-3'>
                <Form>
                    <InputGroup className='my-2'>
                        <InputGroup.Text>이 메 일</InputGroup.Text>
                        <Form.Control value={email}
                            onChange={onChange} name="email"/>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Form.Control 
                            onChange={onChange} name="password"
                            value={password} type="password"/>
                    </InputGroup>
                    <Button 
                        onClick={onJoin}
                        className='w-100'>회원등록</Button>
                    <div className='text-end my-2'>
                        <Link to="/login">로그인</Link>
                    </div>    
                </Form>
            </Card>
        </Col>
    </Row>
    )
}

export default JoinPage