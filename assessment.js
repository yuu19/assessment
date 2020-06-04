'use strict';
const dayInput = document.getElementById('day');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
        }
    }
    
assessmentButton.onclick = () => {
    const day = dayInput.value;
    if(day.length === 0) {
       return;

}

removeAllChildren(resultDivided);
const header = document.createElement('h3');
header.innerText = '診断結果';
resultDivided.appendChild(header);


const paragraph = document.createElement('p');
const result = assessment(day);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);

removeAllChildren(tweetDivided);                            
const anchor = document.createElement('a');
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('今日の数学書')
  + '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #今日の数学書';
tweetDivided.appendChild(anchor);

//widgets.jsの設定
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);
};



const answers = [
    '今日は{day}なので、「伊藤ルベーグ」を読みましょう!',
    '今日は{day}なので、「黒田関数解析」を読みましょう!',
    '今日は{day}なので、「SGA」を読みましょう!',
    '今日は{day}なので、「雪江代数」を読みましょう!',
    '今日は{day}なので、「松島多様体」を読みましょう!',
    '今日は{day}なので、「ハーツホーン」を読みましょう!',
    '今日は{day}なので、「線形代数の世界」を読みましょう!'
];


/**
 * 今日の曜日を渡すと診断結果を返す関数
 */
function assessment(day) {
    let sumOfCharCode = 0;
    for(let i = 0; i < day.length; i++) {
        sumOfCharCode = sumOfCharCode + day.charCodeAt(i);
    }

    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{day\}/g, day);
    return result;
}

console.assert(
    assessment('水曜日') === '今日は水曜日なので、「SGA」を読みましょう!',
    'ダメ'
);

