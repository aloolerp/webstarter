import { FrontListItem } from './FrontListItem'

export interface FrontProject{
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
	/**	Category : Link - Front Service	*/
	category?: string
	/**	Client : Link - Front Client	*/
	client?: string
	/**	Route : Data	*/
	route?: string
	/**	Cover : Attach Image	*/
	meta_image?: string
	/**	Client Logo : Attach	*/
	client_logo?: string
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
	/**	Items : Table - Front List Item	*/
	items?: FrontListItem[]
	/**	Remark : Text	*/
	remark?: string
	/**	Meta Title : Data	*/
	meta_title?: string
	/**	Meta Description : Small Text	*/
	meta_description?: string
}