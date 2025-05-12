package com.vaccation.Portal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name ="Student")
public class Student {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	 private Long id;
	
	@Column(name="name")
    private String name;
	
	@Column(name="className")
    private String className;
	
	@Column(name="studentId",unique=true)
    private String studentId;
    //private boolean vaccinated;
	@Column(name="vaccinatedStatus")
    private String vaccinatedStatus; 
    
    
    
    public Student() {}
	
	public Student(Long id, String name, String className, String studentId, String vaccinatedStatus) {
		super();
		this.id = id;
		this.name = name;
		this.className = className;
		this.studentId = studentId;
		this.vaccinatedStatus = vaccinatedStatus;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getVaccinatedStatus() {
		return vaccinatedStatus;
	}

	public void setVaccinatedStatus(String vaccinatedStatus) {
		this.vaccinatedStatus = vaccinatedStatus;
	}
	
	
}
