
export interface FrontListItem{
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
	/**	Image : Attach	*/
	image?: string
	/**	Title : Data	*/
	title?: string
	/**	Content : Small Text	*/
	content?: string
	/**	Primary Label : Data	*/
	primary_label?: string
	/**	Primary URL : Data	*/
	primary_url?: string
	/**	Secondary Label : Data	*/
	secondary_label?: string
	/**	Secondary URL : Data	*/
	secondary_url?: string
	/**	Hide : Check	*/
	hide?: 0 | 1
	/**	Detail : Text Editor	*/
	detail?: string
}