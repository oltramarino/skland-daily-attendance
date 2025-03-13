export async function serverChan(sendkey: string, title: string, content: string): Promise<number> {
  if (typeof sendkey !== 'string') {
    console.error('Wrong type for serverChan token.');
    return -1;
  }

  // 构造请求的 JSON 参数
  const payload = {
    msg: `${title}\n${content}`, // 将 title 和 content 合并为消息内容
  };

  try {
    const resp = await fetch(
      `https://qmsg.zendee.cn/jsend/${sendkey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await resp.json();

    // 根据接口响应判断是否成功
    if (data.success) {
      console.log('[ServerChan] Send message to ServerChan successfully.');
      return 0;
    } else {
      console.error(`[ServerChan] Failed to send message. Reason: ${data.reason}`);
      return -1;
    }
  } catch (error) {
    console.error(`[ServerChan] Error: ${error}`);
    return -1;
  }
}
