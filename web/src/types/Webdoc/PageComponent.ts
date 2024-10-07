import { ComponentItem } from './ComponentItem'

export interface PageComponent{
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
	/**	Title : Data	*/
	title: string
	/**	Type : Select	*/
	type?: "Component" | "Section" | "Navbar" | "Footer"
	/**	Standard : Check	*/
	standard?: 0 | 1
	/**	Module : Link - Module Def	*/
	module?: string
	/**	Generation Path : Select	*/
	generate?: "Default" | "Page" | "Folder Name"
	/**	Page : Link - Web Page	*/
	page?: string
	/**	Folder Name : Data	*/
	folder_name?: string
	/**	Template : Code	*/
	template?: string
	/**	Fields : Table - Component Item	*/
	fields?: ComponentItem[]
}