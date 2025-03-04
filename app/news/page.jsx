'use cilent'
const Page = () => {
  const news = [
    {
      title: "Thanh toán bằng MoMo - Vé U22 đồng giá chỉ từ 40k",
      image: "https://files.betacorp.vn//media/images/2024/09/01/545x415-131203-010924-53.jpg",
      content:""
     
    },
    {
      title: "Dành tặng 10K cho các Beta-er",
      image: "https://files.betacorp.vn//media/images/2024/10/01/shopeepay-x-beta-545x415-141352-011024-59.png",

    },
    {
      title: "Beta vé rẻ, Momo mua liền!",
      image: "https://files.betacorp.vn//media/images/2024/04/16/339090620-769688404468201-6997705945754521027-n-113050-160424-59.jpg",
     
    },
    {
      title: "Thành viên Beta - Đồng giá 45K/50K",
      image: "https://files.betacorp.vn//cms/images/2024/04/03/545x415-member-130929-030424-88.jpg",
    
    },
    {
      title: "Thứ 3 vui vẻ - Đồng giá 45K",
      image: "https://files.betacorp.vn//cms/images/2024/04/03/545x415-t3vv-130807-030424-88.jpg",   

      
    },
    {
      title: "Giá vé ưu đãi cho học sinh, sinh viên",
      image: "https://files.betacorp.vn//cms/images/2024/04/03/545x415-hssv-131204-030424-20.jpg",
     
    },
  ];

  return (
    <div className="mt-40 px-10">
      <h2 className="text-2xl font-bold mb-8">Khuyến Mãi Mới</h2>
      <div className="grid grid-cols-2 gap-10">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
          
              className="w-80 h-60 object-cover rounded-lg "
            />
          <p className="text-lg font-semibold mt-4 text-center hover:underline">{item.title}</p>

          </a>
        ))} 
      </div>
    </div>
  );
};

export default Page;
