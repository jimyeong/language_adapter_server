```
    static associate(db) {
        db.Dictionary.hasMany(db.Hints, {
            foreignKey: "fk_dictionary_hint_id",
            as: "hints", // join 시 여기 있는 이름으로 파라미터에 담을 수 있다.
            onDelete: "cascade",
        })
        db.Dictionary.belongsTo(db.User, {
            foreignKey: "userId",
            as: "dictionaries",
            onDelete: "cascade",
        });
    }

    SynonymsManager
    매니저에 Synonyms의 id를 외래키로 넣는다.


    // hasMany 1:M 관계 1st param 은 target인데 hasMany는 타겟 테이블에 외래키가 정의됨
```

```

      {
        model: Usecases,
        as: "usecases",
        attributes: ["lang_english", "lang_origin", "key_phrase"],
      },
      {
        model: Tags,
        as: "tags",
        attributes: ["tag_content"],
      },
      {
        model: Synonyms,
        as: "synonyms",
        attributes: ["synonym"],
      },
      {
        model: MeaningMemos,
        as: "meanigMemos",
        attributes: ["memo_content"],
      },
```

```
select * from meanings where english_word_id in (SELECT english_word_id FROM language_adapter.english_words
where user_id = 1);

// usecases 만 뽑아오는 쿼리
select * from usecases
where meaning_id in (select meaning_id from meanings where english_word_id in (SELECT english_word_id FROM language_adapter.english_words
where user_id = 1));

```

```
sub쿼리를 이용하는 방법
Usecases.findAll({
    attributes: {
      where: {
        meaning_id: {
          [Op.or]: [
            sequelize.literal(`
                    (
                        select meaning_id from meanings where english_word_id in (SELECT english_word_id FROM language_adapter.english_words
                        where user_id = 1)
                    )
                `),
          ],
        },
      },
    },
  })
```

02.08.22 데이터 모델 수정, 및 데이터 들어가는 지 확인, 03일(내일) 포스트맨을 이용한 데이터 삽입작업, 및 에러처리 할 것

03.08.22 서버쪽 데이터베이스에 데이터 삽입 완료, 에러처리를 아직 안함 04일(내일) 클라이언트쪽 데이터 받아서 보여주기, 서버 수정 및 삭제 예외처리 프로세스 추가

04.08.22 클라이이언트쪽 달력부분 보여주고 있음, 내일은 퀴즈쪽 작업할 것, 데이터 수정, 삭제, 이미지 등록 프로세스 추가,
jest 공부할것

05.08.22 집을 옮기느라 작업을 많이 못했음, 그런데, 퀴즈까지는 했음, 06일(내일) 이미지등록프로세스 추가, 데이터수정,삭제, 복습 소팅 작업 추가 할 것, 동의어같은 것들 추가가 안되었다면, 빈배열로 넘기도록 처리한다.

06.08.22 삭제프로세스 작업중, 삭제프로세스를
07.08.22 삭제프로세스 작업중, 컴포넌트 구성을어떻게 해야할지 고민하느라, 시간이 가버림, 교회도 가야 했다.

08.08.22 삭제프로세스, 컴포넌트 작업하기

18.08.22 세션 로그인 작업중인데, express-session 라이브러리에서 cookie 설정 {
secure: true 로 해놓는 바람에 쿠키 설정이 안되서 한참 헤멨다.
}
09.08.22 데이터를 어떤 레벨에 둘것이냐, 그럼 어떤 패턴을 쓸 것이냐 이게 쟁점인 것 같다
이질문을 해야하고 대답이 있어야 한다.
내가 만들려고 하는 것은
달력이 있고, 데이터를 가져오면, 달력에 표시한다. 그과정에서 가공이 된다.
그런데 받아온데이터를 전역에 두면, 달력과 관련해서, 날짜 선택등 그 자잘한 데이터를 모두
전역 스토어 에 둬야 하나
난 그냥 역활분리를 하고 싶을 뿐

달력에서 활용하는 달력은 달력컴포넌트 를 감싸고 있는 컴포넌트에서 하면 좋겠지만
그렇다고 해서, state를 통해서 깊은 층위까지 데이터를 전달하고 싶지는 않다.
그건 코드가 많아질수록 너무 복잡해지기 때문이다.
context를 사용해야 겠다.

14.10.2022
데이터 받을 때 자꾸 에러나서 죽는다 수정할 것,
수정 프로세스 추가할것

데이터베이스, 태그 모델링 수정하기
