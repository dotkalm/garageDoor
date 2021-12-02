import React, { useRef } from 'react'
import { useLazyQuery, NetworkStatus } from '@apollo/client';

export default function LoggerHead(){
	  const [ getNewHead , { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

}
