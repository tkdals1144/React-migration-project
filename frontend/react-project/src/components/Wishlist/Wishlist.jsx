import React, { useState } from 'react'

// 생성시 처음부터 wishlist의 list를 받아와야 하므로 인자가 필요
function Wishlist({ initialWishlist }) {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const [wishlistSize, setWishlistSize] = useState(initialWishlist.length);
    const [wishlistActive, setWishlistActive] = useState(wishlistSize === 0 ? false : true);

    const deleteItem = async(productId) => {
        try {
            // 서버에 먼저 삭제를 하도록 요청을 함
            const response = await axios.delete(`/wishlist/delete/${productId}`);
            alert(response.data.message);
            // 삭제가 성공했다면
            if (response.data.status === "delete_success") {
                // 일관된 상태를 위해 프론트단에서도 state의 삭제 필터링을 진행함
                const updateList = wishlist.filter(item => item.productId !== productId);
                setWishlist(updateList);
                setWishlistSize(response.data.wishlistSize);
            }
            if (response.data.wishlistSize === 0) {
                setWishlistActive(false);
            }
        } catch (err) {
            console.error("Error : ", err);
        }
    }

    return (
    <div className='main_wrap'>
        <div id="wrap_wrap2">
            <p className="title">위시리스트</p>
            <hr className='main_hr'/>
            <ul className="list_wrap">
                {/* 이 부분은 state를 통한 상태관리로 개편 */}
                {/* <li className="list" th:each="item : ${wishlist}" th:data-product-id="${item.productId}">
                    <div className="close_wrap" th:onclick="deleteItem(this)">
                        <img th:src="@{/img/close.svg}" alt="" className="close"/>
                    </div>
                    <p className="price" th:text="'￦' + ${#numbers.formatInteger(item.currentPrice, 0, 'COMMA')}"></p>
                    <div className="img_wrap">
                        <img th:src="${item.imageUrl}" alt="" className="img"/>
                    </div>
                    <div className="info_box">
                        <a th:href="@{/brand/{brandName}(brandName = ${item.brandName})}">
                            <p th:text="${item.brandName}"></p>
                        </a>
                        <a th:href="@{/product/{productId}(productId = ${item.productId})}">
                            <p className="info_title" th:text="${item.name}"></p>
                        </a>
                        <ul className="info_wrap">
                            <li className="info">
                                <span th:if="${item.originalPrice != null}" th:text="'￦' + ${#numbers.formatInteger(item.originalPrice, 0, 'COMMA')}"></span>
                                <b className="small" th:if="${item.originalPrice != null}" th:text="원래가격"></b>
                            </li>
                        </ul>
                    </div>
                </li> */}
                {/* th:each 반복문은 map으로 변환 */}
                {wishlist.map(item => {
                    <li className='list' key={item.productId}>
                        <div className='close_wrap' onClick={() => deleteItem(item.productId)}>
                            <img src='/img/close.svg' alt='' className='close'/>
                        </div>
                        <p className='price'>
                            ￦{item.currentPrice.toLocaleString()}
                        </p>
                        <div className='img_wrap'>
                            <img src={item.imageUrl} alt='' className='img'/>
                        </div>
                        <div className='info_box'>
                            <Link to={`/brand/${item.brandName}`}>
                                <p>{item.brandName}</p>
                            </Link>
                            <Link to={`/product/${item.productId}`}>
                                <p className='info_title'>{item.name}</p>
                            </Link>
                            <ul className='info_wrap'>
                                {item.originalPrice && (
                                    <li className='info'>
                                        <span>
                                            ￦{item.originalPrice.toLocaleString()}
                                        </span>
                                        <b className='small'>원래가격</b>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </li>
                })}
            </ul>
        </div>
        {/* 기존의 코드는 삭제키를 누르면 ajax로 서버에 delete 요청을 하고 성공시 dom에서 직접적으로 제거하는 방식이었다. */}
        {/* 하지만 react는 dom을 직접적으로 제거하는 방식이 아닌 state를 통한 상태관리를 사용한다. */}
        {/* ajax와 같은 비동기 통신인 axios를 이용하여 상태 기반으로 state를 업데이트할 생각이다. */}
        {/* <script>
            function deleteItem(element){
                let item = element.closest(".list");
                let productId = item.dataset.productId;

                $.ajax({
                    url: "/wishlist/delete/" + productId,
                    type: "DELETE",
                    success: function(response){
                        alert(response.message);
                        if(response.status === "delete_success"){
                            if(item){
                                item.remove();
                                if(size === 0){
                                let size = Number(response.wishlistSize);
                                    $("#wishlist_small_icon").removeClass("active");
                                } else{
                                    $("#wishlist_size").text(size);
                                }
                            }
                        }
                    },
                    error: function(xhr, status, error){
                        console.log("Error:", error);
                    }
                });
            }
        </script> */}
    </div>
  )
}

export default Wishlist