
export interface FrontClient{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Header : Data	*/
	header: string
	/**	Description : Small Text	*/
	description?: string
	/**	Category : Data	*/
	category?: string
	/**	Route : Data	*/
	route?: string
	/**	Cover : Attach Image	*/
	meta_image?: string
	/**	Status : Select	*/
	status?: "Active" | "Inactive"
	/**	Enabled : Check	*/
	enabled?: 0 | 1
	/**	Published : Check	*/
	published?: 0 | 1
	/**	Add to the Slideshow : Check	*/
	slide?: 0 | 1
	/**	Add to the Tabs : Check	*/
	tab?: 0 | 1
	/**	Remark : Text	*/
	remark?: string
	/**	Meta Title : Data	*/
	meta_title?: string
	/**	Meta Description : Small Text	*/
	meta_description?: string
}