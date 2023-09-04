/**
 * @return {string} 
 */
const getIP = async () => {
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('无法获取IP地址');
    }
    const data = await response.json();
    const userIP = data.ip;
    return userIP;
  } catch (error) {
    console.error('获取IP地址时出现错误：', error);
    return '0.0.0.1';
  }
};


export {getIP}
