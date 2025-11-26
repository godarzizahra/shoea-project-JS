import { El } from "../../utils/el";

export function singelProduct() {
  //back-Btn
  const backBtn=El({
    element:'div',
    className:'relative '
     children:[
      El({
        element:"img",
        src:"/public/Vector (3).svg",
        className:'absolute left-4 top-4',
      })
    ]
  })
	//photo-product
  const photoProduct=El({
    element:'div',
    children:[
      El({
        element:"img",
        src:"",
      })
    ]
  })
	//name-product
  const nameProduct=El({
    element:'div',
    className:'flex flex-col ',
    children:[
      El({
        element:'div',
        className:'flex justify-between',
        children:[
          El({
            element:'h2',
            innerText:'Running Sportwear',
            className:'text-3xl font-bold',
          }),
          El({
            element:'img',
            src:'',
          })
        ]
      }),
      El({
          element:'div',
        className:'flex gap-2',
        children:[
          El({
            element:'span',
            innerText:'5.371 sold',
            className:'bg-gray-300 p-3 rounded-xl',
          }),
          El({
            element:'img',
            src:'',
          })
           El({
            element:'span',
            innerText:'4.3(5,389 reviews)',
            className:'',
          }),
        ]
      })
    ]
  })
	//description-product
  const descriptionProduct=El({

    element:'div',
    className:'flex flex-col gap-2',
    children:[
      El({
        element:'h4',
        innerText:'Description',
      }),
       El({
        element:'p',
        innerText:'Lorem Ipsum has been the industrys standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      }),
    ]
  })
	//size-color-product
  const productOption=El({
    element:'div',
    className:'',
    children:[
      El({
        element:'div',
        className:'flex',
        children:[
          El({
            element:'span',
            innerText:'Size',
            className:'font-bold',
          }),
          El({
            element:'span',
            innerText:'Color',
            className:'font-bold',
          })
        ]
      }),
      El({
        element:"div",
        className:'flex gap-5',
        children:[
          El({
            element:'div',
            className:'flex',
            children:[
              El({
                element:'div',
                innerText:'40',
                className:'p-3 text-gray-300 border-2 border-gray-300 rounded-full text-center',
              }),
              El({
                element:'div',
                innerText:'42',
                className:'p-3 text-gray-300 border-2 border-gray-300 rounded-full text-center',
              }),
              El({
                element:'div',
                innerText:'43',
                className:'p-3 text-gray-300 border-2 border-gray-300 rounded-full text-center',
              }),
            ],
          }),
           El({
            element:'div',
            className:'flex',
            children:[
              El({
                element:'div',
                className:'rounded-full bg-gray-100 w-3 h-3 ',
              }),
              El({
                element:'div',
               className:'rounded-full w-3 h-3 bg-gray-700',
              }),
              El({
                element:'div',
                className:'rounded-full w-3 h-3 bg-pink-500',
              }),
              El({
                element:'div',
                className:'rounded-full w-3 h-3 bg-brown-700',
              }),
               El({
                element:'div',
                className:'rounded-full w-3 h-3 bg-blue-600',
              }),
            ],
          }),
        ]
      })
    ]

  })
	//quantity
const quantityProduct=El({
  element:'div',
  className:'flex gap-5',
  children:[
    El({
      element:'span',
      innerText:'Quantity'
    }),
    El({
      element:'div',
      className:'bg-gray-300 p-3',
      children:[
        El({
          element:'span',
          innerText:'-',
        }),
        El({
          element:'span',
          innerText:'2',
        }),
        El({
          element:'span',
          innerText:'+',
        }),
      ]
    })
  ]
})
	//total_price
  const totalPrice=El({
    element:'div',
    className:'flex ',
    children:[
      El({
        element:'div',
        className:'flex flex-col gap-2',
        children:[
          El({
            element:'span',
            innerText:'Total price',
          }),
          El({
            element:'span',
            innerText:'$240.00',
          }),
        ]
      }),
      El({
        element:'div',
        children:[
          El({
            element:'bUtton',
            innerText:'Add to Cart',
            className:'p-4 bg-black',
          })
        ]
      })
    ]
  })
	const renderPage = El({
		element: "div",
		className:
			"w-[428px] h-[926px] bg-white pb-20 flex flex-col items-center justify-start p-2",
		children: [],
	});
	return renderPage;
}
