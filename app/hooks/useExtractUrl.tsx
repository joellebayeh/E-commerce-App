// import { useState, useEffect } from 'react';

const useExtractUrl = (input) => {
    const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if(!input.match(regex)){
        return input.replace(/^[^a-zA-Z]*/, '').replace(/[^a-zA-Z]*$/, '');
    }
    return input;

    // const [extractedUrl, setExtractedUrl] = useState(input);
    //
    // useEffect(() => {
    //     if (!input) {
    //         setExtractedUrl(null);
    //         return;
    //     }
    //
    //     const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    //     if(!input.match(regex)){
    //         setExtractedUrl(input.replace(/^[^a-zA-Z]*/, '').replace(/[^a-zA-Z]*$/, ''));
    //     }
    //
    // }, [input]);
    // return extractedUrl;
};

export default useExtractUrl;
